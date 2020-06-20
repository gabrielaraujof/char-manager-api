import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmDefaultOptions } from './config/type-orm.config';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmDefaultOptions), CharacterModule],
})
export class AppModule {}
