import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(createAuthDto: any) {
    return 'This action adds a new auth';
  }

  async login(authDto: AuthDto) {
    const payload = { login: authDto.login, password: authDto.password };
    const user = await this.usersService.findByLoginAndPass(authDto);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
