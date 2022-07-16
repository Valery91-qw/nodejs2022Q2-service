import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, ResponseUserType } from './models/user.model';
import { User } from './helpers/User';

@Injectable()
export class UsersService {
  private users: Array<IUser> = [];

  public async create(createUserDto: CreateUserDto): Promise<ResponseUserType> {
    const newUser = new User(createUserDto.login, createUserDto.password);
    this.users.push(newUser);
    return newUser.getUserInfo();
  }

  public async findAll(): Promise<Array<IUser>> {
    return this.users;
  }

  public async findOne(id: string): Promise<IUser> {
    return this.users.find((user) => user.id === id);
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserType | boolean> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return user;
    else {
      const isUpdate = user.updatePassword(
        updateUserDto.oldPassword,
        updateUserDto.newPassword,
      );
      if (!isUpdate) return isUpdate;
      else return user.getUserInfo();
    }
  }

  public async remove(id: string): Promise<IUser> {
    const existingUser = this.users.find((user) => user.id === id);
    if (!existingUser) return existingUser;
    else {
      this.users = this.users.filter((user) => user.id !== existingUser.id);
      return existingUser;
    }
  }
}
