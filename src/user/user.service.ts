import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly users = [];

  getAllUsers() {
    return this.users;
  }
}
