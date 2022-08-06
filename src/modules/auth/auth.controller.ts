import {
  Controller,
  Post,
  Body,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import jwtAuthMetadata from '../../guards/jwt-auth.metadata';

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
  async login(@Body() authDto: AuthDto) {
    const jwt = await this.authService.login(authDto);
    console.log(jwt);
    if (!jwt) throw new ForbiddenException('Incorrect data');
    return jwt;
  }

  @Post('/refresh')
  async findOne(@Param('id') id: string) {
    return;
  }
}
