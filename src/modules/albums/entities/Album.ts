import { IAlbum } from '../model/album.model';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(name: string, year: number, artistId?: string) {
    this.name = name;
    this.year = year;
    this.artistId = artistId || null;
  }

  static updateAlbum(album: IAlbum, UpdateAlbumDto: UpdateAlbumDto): IAlbum {
    album.name = UpdateAlbumDto.name;
    album.year = UpdateAlbumDto.year;
    album.artistId = UpdateAlbumDto.artistId || null;
    return album;
  }
}
