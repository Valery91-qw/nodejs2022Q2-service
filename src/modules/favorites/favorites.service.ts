import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class FavoritesService {
  favorite: {
    tracks: Array<string>;
    albums: Array<string>;
    artists: Array<string>;
  } = {
    tracks: [],
    albums: [],
    artists: [],
  };

  constructor(
    private readonly trackService: TracksService,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}

  async findAll() {
    const foundTracks = await Promise.all(
      this.favorite.tracks.map((el) => this.trackService.findOne(el)),
    );
    const foundAlbums = await Promise.all(
      this.favorite.albums.map((el) => this.albumService.findOne(el)),
    );
    const foundArtists = await Promise.all(
      this.favorite.artists.map((el) => this.artistService.findOne(el)),
    );

    return {
      tracks: foundTracks.filter((el) => el !== undefined),
      albums: foundAlbums.filter((el) => el !== undefined),
      artists: foundArtists.filter((el) => el !== undefined),
    };
  }

  async createFavTrack(id: string): Promise<void> {
    const track = await this.trackService.findOne(id);
    if (!track) throw new UnprocessableEntityException("This id doesn't exist");
    this.favorite.tracks.push(id);
    return;
  }

  async createFavAlbum(id: string): Promise<void> {
    const album = await this.albumService.findOne(id);
    if (!album) throw new UnprocessableEntityException("This id doesn't exist");
    this.favorite.albums.push(id);
    return;
  }

  async createFavArtist(id: string): Promise<void> {
    const artist = await this.artistService.findOne(id);
    if (!artist)
      throw new UnprocessableEntityException("This id doesn't exist");
    this.favorite.artists.push(id);
    return;
  }

  async removeTrack(id: string): Promise<void> {
    const track = this.favorite.tracks.find((el) => el === id);
    if (!track) throw new NotFoundException();
    this.favorite.tracks = this.favorite.tracks.filter((el) => el !== id);
    return;
  }

  async removeAlbum(id: string): Promise<void> {
    const album = this.favorite.albums.find((el) => el === id);
    if (!album) throw new NotFoundException();
    this.favorite.albums = this.favorite.albums.filter((el) => el !== id);
    return;
  }

  async removeArtist(id: string): Promise<void> {
    const artist = this.favorite.artists.find((el) => el === id);
    if (!artist) throw new NotFoundException();
    this.favorite.artists = this.favorite.artists.filter((el) => el !== id);
    return;
  }
}
