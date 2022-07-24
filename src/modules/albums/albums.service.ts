import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from './model/album.model';
import { Album } from './entities/Album';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    const newAlbum = new Album(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    return await this.prisma.album.create({
      data: newAlbum,
    });
  }

  async findAll(): Promise<Array<IAlbum>> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<IAlbum> {
    return await this.prisma.album.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) return album;
    return await this.prisma.album.update({
      where: { id },
      data: Album.updateAlbum(album, updateAlbumDto),
    });
  }

  async remove(id: string): Promise<IAlbum> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) return album;
    await this.prisma.album.delete({
      where: { id },
    });
    return album;
  }
}
