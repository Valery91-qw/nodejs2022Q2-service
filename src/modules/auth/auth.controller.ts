import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import jwtAuthMetadata from '../../guards/jwt-auth.metadata';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() createAuthDto: any) {
    return await this.authService.signup(createAuthDto);
  }

  @jwtAuthMetadata.Public()
  @Post('/login')
  async login(@Body() authDto: AuthDto) {
    const jwt = await this.authService.login(authDto);
    console.log(jwt);
    return jwt;
  }

  @Post('/refresh')
  async findOne(@Param('id') id: string) {
    return await this.authService.findOne(+id);
  }
}
