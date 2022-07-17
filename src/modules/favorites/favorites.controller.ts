import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('/track/:id')
  async createTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.favoritesService.createFavTrack(id);
    return;
  }

  @Post('/album/:id')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.favoritesService.createFavAlbum(id);
  }

  @Post('/artist/:id')
  async createArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.favoritesService.createFavArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.favoritesService.removeTrack(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.favoritesService.removeAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.favoritesService.removeArtist(id);
  }
}
