import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';
import { IAuthModuleOptions } from '@nestjs/passport';
import { config } from 'dotenv';
import { join } from 'path';

config();

export const TypeOrmDefaultOptions: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URI,
  w: 'majority',
  autoLoadEntities: true,
  synchronize: true,
};

export const JwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'secret',
  signOptions: {
    expiresIn: 3600,
  },
};

export const AuthModuleOptions: IAuthModuleOptions = { defaultStrategy: 'jwt' };

@Injectable()
export class ConfigService {
  get baseUrl(): string {
    return process.env.BASE_URL;
  }

  get clientUrl(): string {
    return process.env.CLIENT_URL;
  }

  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'secret';
  }

  get googleOAuthConfig(): any {
    return {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/${join(
        'auth',
        'google',
        'callback',
      )}`,
      passReqToCallback: false,
      scope: ['profile', 'email'],
    };
  }
}
