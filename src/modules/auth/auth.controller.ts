import {
  Controller,
  Post,
  Body,
  ForbiddenException,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import jwtAuthMetadata from '../../guards/jwt/jwt-auth.metadata';
import { JwtRefreshGuard } from '../../guards/jwt-refresh/jwt-refresh.guard';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @jwtAuthMetadata.Public()
  @Post('/signup')
  async signup(@Body() authDto: AuthDto) {
    return await this.authService.signup(authDto);
  }

  @jwtAuthMetadata.Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authDto: AuthDto) {
    const jwt = await this.authService.login(authDto);
    if (!jwt) throw new ForbiddenException('Incorrect data');
    return jwt;
  }

  @jwtAuthMetadata.Public()
  @UseGuards(JwtRefreshGuard)
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refresh(refreshDto);
  }
}
