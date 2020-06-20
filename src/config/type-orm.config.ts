import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();


export const TypeOrmDefaultOptions: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.DB_URI,
  w: 'majority',
  autoLoadEntities: true,
  synchronize: true,
};
