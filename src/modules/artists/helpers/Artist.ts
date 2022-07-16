import { IArtist } from '../model/artist.model';
import { randomUUID } from 'crypto';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(name: string, grammy: boolean) {
    this.id = randomUUID();
    this.name = name;
    this.grammy = grammy;
  }

  updateArtistInfo(name: string, grammy: boolean): void {
    this.name = name;
    this.grammy = grammy;
    return;
  }
}
