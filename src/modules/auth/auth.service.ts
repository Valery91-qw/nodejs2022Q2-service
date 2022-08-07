import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshDto } from './dto/refresh.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
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
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
      }),
    };
  }

  async refresh(refreshDto: RefreshDto) {
    const userData = this.jwtService.decode(refreshDto.refreshToken);
    if (typeof userData === 'object') {
      const user = await this.prisma.user.findFirst({
        where: { login: userData.login },
        select: {
          login: true,
          password: true,
        },
      });
      return await this.login(user);
    }
    return;
  }
}
