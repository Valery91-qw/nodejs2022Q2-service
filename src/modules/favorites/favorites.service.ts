import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

  constructor(private prisma: PrismaService) {}

  async findAll() {
    const foundTracks = await Promise.all(
      this.favorite.tracks.map((el) =>
        this.prisma.track.findUnique({ where: { id: el } }),
      ),
    );
    const foundAlbums = await Promise.all(
      this.favorite.albums.map((el) =>
        this.prisma.album.findUnique({ where: { id: el } }),
      ),
    );
    const foundArtists = await Promise.all(
      this.favorite.artists.map((el) =>
        this.prisma.artist.findUnique({ where: { id: el } }),
      ),
    );

    return {
      tracks: foundTracks.filter((el) => el !== null || undefined),
      albums: foundAlbums.filter((el) => el !== null || undefined),
      artists: foundArtists.filter((el) => el !== null || undefined),
    };
  }

  async createFavTrack(id: string): Promise<boolean> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) return false;
    this.favorite.tracks.push(id);
    return true;
  }

  async createFavAlbum(id: string): Promise<boolean> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) return false;
    this.favorite.albums.push(id);
    return true;
  }

  async createFavArtist(id: string): Promise<boolean> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) return false;
    this.favorite.artists.push(id);
    return true;
  }

  async removeTrack(id: string): Promise<boolean> {
    const track = this.favorite.tracks.find((el) => el === id);
    if (!track) return false;
    this.favorite.tracks = this.favorite.tracks.filter((el) => el !== id);
    return true;
  }

  async removeAlbum(id: string): Promise<boolean> {
    const album = this.favorite.albums.find((el) => el === id);
    if (!album) return false;
    this.favorite.albums = this.favorite.albums.filter((el) => el !== id);
    return true;
  }

  async removeArtist(id: string): Promise<boolean> {
    const artist = this.favorite.artists.find((el) => el === id);
    if (!artist) return false;
    this.favorite.artists = this.favorite.artists.filter((el) => el !== id);
    return true;
  }
}
