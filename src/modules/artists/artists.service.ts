import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './model/artist.model';
import { Artist } from './helpers/Artist';

@Injectable()
export class ArtistsService {
  private artists: Array<IArtist> = [];

  async create(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const newArtist = new Artist(createArtistDto.name, createArtistDto.grammy);
    this.artists.push(newArtist);
    return newArtist;
  }

  async findAll(): Promise<Array<IArtist>> {
    return this.artists;
  }

  async findOne(id: string): Promise<IArtist> {
    return this.artists.find((artist) => artist.id === id);
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<IArtist> {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) return artist;
    return Artist.updateArtistInfo(artist, updateArtistDto);
  }

  async remove(id: string): Promise<IArtist> {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) return artist;
    else {
      this.artists = this.artists.filter((artist) => artist.id !== id);
      return artist;
    }
  }
}
