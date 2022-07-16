import { randomUUID } from 'crypto';
import { IUser } from '../models/user.model';

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

  public updatePassword(oldPassword: string, newPassword: string): boolean {
    if (this.password !== oldPassword) return false;
    else {
      this.password = newPassword;
      this.version++;
      this.updatedAt = Date.now();
      return true;
    }
  }

  public getUserInfo() {
    return {
      id: this.id,
      login: this.login,
      version: this.version,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
