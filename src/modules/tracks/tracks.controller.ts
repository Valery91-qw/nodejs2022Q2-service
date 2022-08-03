import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './model/track.model';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async create(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    return await this.tracksService.create(createTrackDto);
  }

  @Get()
  async findAll(): Promise<Array<ITrack>> {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ITrack> {
    const track = await this.tracksService.findOne(id);
    if (!track) throw new NotFoundException(`user with this id not found`);
    return track;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<ITrack> {
    const track = await this.tracksService.update(id, updateTrackDto);
    if (!track) throw new NotFoundException(`user with this id not found`);
    return track;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const track = await this.tracksService.remove(id);
    if (!track) throw new NotFoundException(`user with this id not found`);
    return;
  }
}
