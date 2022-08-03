import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from './model/album.model';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  async findAll(): Promise<Array<IAlbum>> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<IAlbum> {
    const album = await this.albumsService.findOne(id);
    if (!album) throw new NotFoundException(`Album with this id not found`);
    else return album;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<IAlbum> {
    const album = await this.albumsService.update(id, updateAlbumDto);
    if (!album) throw new NotFoundException(`Album with this id not found`);
    else return album;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const album = await this.albumsService.remove(id);
    if (!album) throw new NotFoundException(`Album with this id not found`);
    else return;
  }
}
