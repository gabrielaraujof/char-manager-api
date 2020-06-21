import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '../config/config.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService, private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = payload.oauth
      ? await this.authService.validateOAuthUser(payload)
      : await this.authService.validateLocalUser(payload);
    // TODO: possibly also validate user claims??

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
