import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarController } from './star.controller';
import { StarService } from './star.service';
import { StarMatch } from './entity/star.entity';
import {UserModule} from "../user/user.module";
import {UserEntity} from "../user/entity/user.entity";
import {UsersService} from "../user/users.service";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([StarMatch]),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [StarController],
  providers: [StarService, UsersService]
})
export class StarModule {}
