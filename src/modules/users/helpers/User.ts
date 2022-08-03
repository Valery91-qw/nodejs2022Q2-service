import { randomUUID } from 'crypto';
import { IUser } from '../models/user.model';
import { UpdateUserDto } from '../dto/update-user.dto';

export class User implements IUser {
  readonly createdAt: number;
  readonly id: string;
  login: string;
  password: string;
  updatedAt: number;
  version: number;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
    this.id = randomUUID();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }

  static updatePassword(user: IUser, updateUserDto: UpdateUserDto): boolean {
    if (user.password !== updateUserDto.oldPassword) return false;
    else {
      user.password = updateUserDto.newPassword;
      user.version++;
      user.updatedAt = Date.now();
      return true;
    }
  }

  getUserInfo() {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
