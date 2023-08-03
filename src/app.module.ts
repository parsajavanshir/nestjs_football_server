import { CrawlLiveContent } from './crawl/live_content.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { StarMatch } from './match/star.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StarModule } from './match/star.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'root',
      password: 'admin123',
      database: 'soccer_fly',
      entities: [UserEntity, StarMatch, CrawlLiveContent],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    StarModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
