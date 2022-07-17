import { IAlbum } from '../model/album.model';
import { randomUUID } from 'crypto';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(name: string, year: number, artistId?: string) {
    this.id = randomUUID();
    this.name = name;
    this.year = year;
    this.artistId = artistId || null;
  }

  updateAlbum(name: string, year: number, artistId?: string): void {
    this.name = name;
    this.year = year;
    this.artistId = artistId || null;
  }
}
