import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { Character } from './character.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Character]), AuthModule],
  providers: [CharacterService],
  controllers: [CharacterController],
})
export class CharacterModule {}
