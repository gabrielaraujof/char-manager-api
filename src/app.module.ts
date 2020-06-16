import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';

dotenv.config();

const TYPE_ORM_OPTIONS: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URI,
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(TYPE_ORM_OPTIONS)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
