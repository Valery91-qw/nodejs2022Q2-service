import { IUser } from '../models/user.model';
import { UpdateUserDto } from '../dto/update-user.dto';
import { compare, hash } from 'bcrypt';

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
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }

  static async updatePassword(
    user: IUser,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser | boolean> {
    const isPasswordCorrect = await compare(
      updateUserDto.oldPassword,
      user.password,
    );
    if (!isPasswordCorrect) return false;
    else {
      user.password = await hash(
        updateUserDto.newPassword,
        +process.env.CRYPT_SALT,
      );
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
