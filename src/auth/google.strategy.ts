import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-google-oauth20';

import { AuthService } from './auth.service';
import { OAuthProvider } from './oauth-provider.enum';
import { IGoogleProfile } from './google-payload.interface';
import { ConfigService } from '../config/config.service';
import { AccessTokenDto } from './dto/access-token.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private config: ConfigService, private authService: AuthService) {
    super(config.googleOAuthConfig);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: IGoogleProfile,
    done: (err, payload: AccessTokenDto) => void,
  ): Promise<void> {
    const oauthData = {
      thirdPartyId: profile.id,
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      provider: OAuthProvider.GOOGLE,
    };
    return done(null, await this.authService.validateOAuth(oauthData));
  }
}
