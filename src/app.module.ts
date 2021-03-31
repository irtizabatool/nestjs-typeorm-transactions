import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { User } from './user.entity';
import { Pet } from './pet.entity';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [User, Pet],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    }),
    TypeOrmModule.forFeature([User, Pet]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
