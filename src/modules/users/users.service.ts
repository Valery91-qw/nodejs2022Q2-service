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

  public async findAll(): Promise<Array<ResponseUserType>> {
    return this.users.map((el) => el.getUserInfo());
  }

  public async findOne(id: string): Promise<ResponseUserType> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return user;
    return user.getUserInfo();
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseUserType | boolean> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return user;
    else {
      const isUpdate = User.updatePassword(user, updateUserDto);
      if (!isUpdate) return isUpdate;
      else return user.getUserInfo();
    }
  }

  public async remove(id: string): Promise<ResponseUserType> {
    const existingUser = this.users.find((user) => user.id === id);
    if (!existingUser) return existingUser;
    this.users = this.users.filter((user) => user.id !== existingUser.id);
    return existingUser.getUserInfo();
  }
}
