import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { ConfigModule } from '../config/config.module';
import { AuthModuleOptions, JwtConfig } from '../config/config.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register(JwtConfig),
        PassportModule.register(AuthModuleOptions),
        ConfigModule,
      ],
      providers: [AuthService, JwtStrategy],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
