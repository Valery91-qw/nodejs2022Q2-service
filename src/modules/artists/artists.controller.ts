import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './model/artist.model';
import constants from './constants/constants';

@Controller(constants.artistsURL)
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto): Promise<IArtist> {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  async findAll() {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<IArtist> {
    const artist = await this.artistsService.findOne(id);
    if (!artist) throw new NotFoundException(constants.notFoundMessage);
    else return artist;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<IArtist> {
    const artist = await this.artistsService.update(id, updateArtistDto);
    if (!artist) throw new NotFoundException(constants.notFoundMessage);
    return artist;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const artist = await this.artistsService.remove(id);
    if (!artist) throw new NotFoundException(constants.notFoundMessage);
    return;
  }
}
