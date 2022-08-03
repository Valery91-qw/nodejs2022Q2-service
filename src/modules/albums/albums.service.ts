import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from './model/album.model';
import { Album } from './helpers/Album';

@Injectable()
export class AlbumsService {
  albums: Array<IAlbum> = [];

  async create(createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    const newAlbum = new Album(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async findAll(): Promise<Array<IAlbum>> {
    return this.albums;
  }

  async findOne(id: string): Promise<IAlbum> {
    return this.albums.find((album) => album.id === id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum> {
    const album = this.albums.find((album) => album.id === id);
    if (!album) return;
    return Album.updateAlbum(album, updateAlbumDto);
  }

  async remove(id: string): Promise<IAlbum> {
    const album = this.albums.find((album) => album.id === id);
    if (!album) return;
    this.albums = this.albums.filter((album) => album.id !== id);
    return album;
  }
}
