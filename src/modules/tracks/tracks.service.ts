import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './model/track.model';
import { Track } from './helpers/Track';

@Injectable()
export class TracksService {
  tracks: Array<ITrack> = [];

  async create(createTrackDto: CreateTrackDto): Promise<ITrack> {
    const newTrack = new Track(
      createTrackDto.name,
      createTrackDto.duration,
      createTrackDto.artistId,
      createTrackDto.albumId,
    );
    this.tracks.push(newTrack);
    return newTrack;
  }

  async findAll(): Promise<Array<ITrack>> {
    return this.tracks;
  }

  async findOne(id: string): Promise<ITrack> {
    return this.tracks.find((track) => track.id === id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<ITrack> {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) return;
    return Track.updateTrack(track, updateTrackDto);
  }

  async remove(id: string): Promise<ITrack> {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) return;
    this.tracks = this.tracks.filter((track) => track.id !== id);
    return track;
  }
}
