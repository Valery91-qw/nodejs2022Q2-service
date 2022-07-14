import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private users = [];

  create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: randomUUID(),
      version: 1,
      createAt: Date.now(),
      updateAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<any[]> {
    return this.users;
  }

  findOne(id: string): Promise<any> {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
