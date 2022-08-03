import { IArtist } from '../model/artist.model';
import { randomUUID } from 'crypto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = randomUUID();
    this.name = name;
    this.grammy = grammy;
  }

  static updateArtistInfo(
    artist: IArtist,
    updateArtistDto: UpdateArtistDto,
  ): IArtist {
    artist.name = updateArtistDto.name;
    if (artist.grammy) return artist;
    artist.grammy = updateArtistDto.grammy;
    return artist;
  }
}
