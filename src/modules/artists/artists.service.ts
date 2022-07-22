import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './model/artist.model';
import { PrismaService } from '../prisma/prisma.service';
import { Artist } from './helpers/Artist';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const newArtist = new Artist(createArtistDto.name, createArtistDto.grammy);
    return this.prisma.artist.create({
      data: newArtist,
    });
  }

  async findAll(): Promise<Array<IArtist>> {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<IArtist> {
    return await this.prisma.artist.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<IArtist> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) return artist;
    return await this.prisma.artist.update({
      where: { id },
      data: Artist.updateArtistInfo(artist, updateArtistDto),
    });
  }

  async remove(id: string): Promise<IArtist> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) return artist;
    else {
      await this.prisma.artist.delete({ where: { id } });
      return artist;
    }
  }
}
