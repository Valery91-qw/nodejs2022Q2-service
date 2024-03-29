import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  NotFoundException,
  ParseUUIDPipe,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserType } from './models/user.model';
import constants from './constants/constants';

@Controller(constants.userURL)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserType> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Array<ResponseUserType>> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseUserType> {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException(constants.userNotFoundMessage);
    else return user;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserType | boolean> {
    const user = await this.usersService.update(id, updateUserDto);
    if (user === null || undefined) {
      throw new NotFoundException(constants.userNotFoundMessage);
    }
    if (user === false) {
      throw new ForbiddenException(constants.incorrectBodyMessage);
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const user = await this.usersService.remove(id);
    if (!user) throw new NotFoundException(constants.userNotFoundMessage);
    else return;
  }
}
