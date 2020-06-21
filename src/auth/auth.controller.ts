import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { ConfigService } from '../config/config.service';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AccessTokenDto } from './dto/access-token.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @ApiExcludeEndpoint()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin(): void {
    // Initiates the Google OAuth2 flow on GoogleStrategy
  }

  @ApiExcludeEndpoint()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(
    @Req() req: Request & { user: AccessTokenDto },
    @Res() res: Response,
  ): void {
    const token: string = req.user.accessToken;
    if (token) {
      res.redirect(`${this.config.clientUrl}/login/success/${token}`);
    } else {
      res.redirect(`${this.config.clientUrl}/login/failure`);
    }
  }

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() signupDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signupDto);
  }

  @Post('/signin')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async signIn(@Body() signIn: SignInDto): Promise<AccessTokenDto> {
    return this.authService.signIn(signIn);
  }
}
