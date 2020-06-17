import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { CharacterModule } from './character/character.module';
import { Character } from './character/character.entity';

dotenv.config();

const TYPE_ORM_OPTIONS: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URI,
  w: 'majority',
  entities: [Character],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(TYPE_ORM_OPTIONS), CharacterModule],
})
export class AppModule { }
