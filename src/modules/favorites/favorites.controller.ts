import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import constants from './constants/constants';

@Controller(constants.favoritesURL)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('/track/:id')
  async createTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const isAdd = await this.favoritesService.createFavTrack(id);
    if (!isAdd)
      throw new UnprocessableEntityException(constants.notFoundErrorText);
    return;
  }

  @Post('/album/:id')
  async createAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const isAdd = await this.favoritesService.createFavAlbum(id);
    if (!isAdd)
      throw new UnprocessableEntityException(constants.notFoundErrorText);
    else return;
  }

  @Post('/artist/:id')
  async createArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const isAdd = await this.favoritesService.createFavArtist(id);
    if (!isAdd)
      throw new UnprocessableEntityException(constants.notFoundErrorText);
    return;
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const isRemove = await this.favoritesService.removeTrack(id);
    if (!isRemove) throw new NotFoundException(constants.notFoundErrorText);
    return;
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const isRemove = await this.favoritesService.removeAlbum(id);
    if (!isRemove) throw new NotFoundException(constants.notFoundErrorText);
    return;
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const isRemove = await this.favoritesService.removeArtist(id);
    if (!isRemove) throw new NotFoundException(constants.notFoundErrorText);
    return;
  }
}
