import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CharacterModule } from './character/character.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { TypeOrmDefaultOptions } from './config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmDefaultOptions),
    CharacterModule,
    AuthModule,
    ConfigModule,
  ],
})
export class AppModule {}
