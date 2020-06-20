import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

import { GooglePayload } from './google-payload.interface';
import { ConfigService } from '../config/config.service';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly config: ConfigService) {}

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
    @Req() req: Request & { user: GooglePayload },
    @Res() res: Response,
  ): void {
    const token: string = req.user.token;
    if (token) {
      res.redirect(`${this.config.clientUrl}/login/success/${token}`);
    } else {
      res.redirect(`${this.config.clientUrl}/login/failure`);
    }
  }
}
