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
import { IUser, ResponseUserType } from './models/user.model';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseUserType> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Array<IUser>> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<IUser> {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException(`user with this id not found`);
    else return user;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserType | boolean> {
    const user = await this.usersService.update(id, updateUserDto);
    if (user === undefined) {
      throw new NotFoundException(`user with this id not found`);
    }
    if (user === false) {
      throw new ForbiddenException('old password is incorrect');
    }
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const user = await this.usersService.remove(id);
    if (!user) throw new NotFoundException(`user with ${id} not found`);
    else return;
  }
}
