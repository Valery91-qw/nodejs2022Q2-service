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

  async signup(authDto: AuthDto) {
    await this.usersService.create(authDto);
    return;
  }

  async login(authDto: AuthDto) {
    const user = await this.usersService.findByLoginAndPass(authDto);
    if (!user) return user;
    const payload = { userId: user.id, login: user.login };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '24h' }),
    };
  }
}
