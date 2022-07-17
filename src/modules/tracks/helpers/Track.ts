import { ITrack } from '../model/track.model';
import { randomUUID } from 'crypto';

export class Track implements ITrack {
  id: string;
  name: string;
  duration: number;
  artistId: string | null;
  albumId: string | null;

  constructor(
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ) {
    this.id = randomUUID();
    this.name = name;
    this.duration = duration;
    this.artistId = artistId || null;
    this.albumId = albumId || null;
  }

  updateTrack(
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ): void {
    this.name = name;
    this.duration = duration;
    this.artistId = artistId || this.artistId;
    this.albumId = albumId || this.albumId;
  }
}
