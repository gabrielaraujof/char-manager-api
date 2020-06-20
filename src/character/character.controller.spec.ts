import { Test, TestingModule } from '@nestjs/testing';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { ConfigModule } from '../config/config.module';
import { AuthModuleOptions, JwtConfig } from '../config/config.service';
import { JwtStrategy } from '../auth/jwt.strategy';

describe('Character Controller', () => {
  let controller: CharacterController;
  const charactersService = { findAll: () => [] };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register(JwtConfig),
        PassportModule.register(AuthModuleOptions),
        ConfigModule,
      ],
      providers: [
        { provide: CharacterService, useValue: charactersService },
        JwtStrategy,
      ],
      controllers: [CharacterController],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
