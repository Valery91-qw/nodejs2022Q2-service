import { randomUUID } from 'crypto';
import { IUser } from '../models/user.model';
import { UpdateUserDto } from '../dto/update-user.dto';

export class User implements IUser {
  id: string;
  login: string;
  password: string;
  updatedAt: number;
  createdAt: number;
  version: number;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.id = randomUUID();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }

  static updatePassword(
    user: IUser,
    updateUserDto: UpdateUserDto,
  ): IUser | boolean {
    if (user.password !== updateUserDto.oldPassword) return false;
    else {
      user.password = updateUserDto.newPassword;
      user.version++;
      user.updatedAt = Date.now();
      return user;
    }
  }

  static getUserInfo(user: IUser) {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
