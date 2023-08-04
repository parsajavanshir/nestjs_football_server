import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StarController } from './star.controller';
import { StarService } from './star.service';
import { StarMatch } from './star.entity';
import { UsersService } from 'src/user/users.service';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/user.entity';

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
