import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  create(o: any) {
    return 'This action adds a new auth';
  }

  login(userDto: CreateUserDto) {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
