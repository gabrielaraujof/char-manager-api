import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth20';

import { AuthService } from './auth.service';
import { OAuthProvider } from './oauth-provider.enum';
import { GooglePayload } from './google-payload.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private config: ConfigService, private authService: AuthService) {
    super(config.googleOAuthConfig);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: { id: string; emails: { value: string }[] },
    done: (err, payload: GooglePayload) => void,
  ): Promise<void> {
    const {
      id,
      emails: [{ value: email }],
    } = profile;
    const token = await this.authService.validateOAuth(
      email,
      id,
      OAuthProvider.GOOGLE,
    );
    return done(null, { token });
  }
}
