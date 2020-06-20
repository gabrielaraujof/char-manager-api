import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { email, oauth } = payload;

    if (oauth) {
      //   TODO: verify authentication on google servers
      //   Otherwise, throw new UnauthorizedException();
    }

    //   TODO: now retrieve user from database
    //   const user = await this.userRepo.findOne({ email });
    const user = { email };

    if (!user) {
      throw new UnauthorizedException();
    }

    // Optionally, validate all user claims

    return user;
  }
}
