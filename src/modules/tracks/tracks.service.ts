import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './model/track.model';
import { Track } from './entities/Track';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<ITrack> {
    const newTrack = new Track(
      createTrackDto.name,
      createTrackDto.duration,
      createTrackDto.artistId,
      createTrackDto.albumId,
    );
    return await this.prisma.track.create({
      data: newTrack,
    });
  }

  async findAll(): Promise<Array<ITrack>> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<ITrack> {
    return await this.prisma.track.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<ITrack> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) return;
    return await this.prisma.track.update({
      where: { id },
      data: Track.updateTrack(track, updateTrackDto),
    });
  }

  async remove(id: string): Promise<ITrack> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) return track;
    else {
      await this.prisma.track.delete({ where: { id } });
      return track;
    }
  }
}
