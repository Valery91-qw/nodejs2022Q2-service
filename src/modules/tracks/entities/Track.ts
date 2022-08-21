import { ITrack } from '../model/track.model';
import { UpdateTrackDto } from '../dto/update-track.dto';

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
    this.name = name;
    this.duration = duration;
    this.artistId = artistId || null;
    this.albumId = albumId || null;
  }

  static updateTrack(track: ITrack, updateTrackDto: UpdateTrackDto): ITrack {
    track.name = updateTrackDto.name;
    track.duration = updateTrackDto.duration;
    track.artistId = updateTrackDto.artistId || track.artistId;
    track.albumId = updateTrackDto.albumId || track.albumId;
    return track;
  }
}
