import { EavAttribute } from './eav/eav.attibute';
import { CrawlLiveContent } from './crawl/live_content.entity';
import { MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { StarMatch } from './match/star.entity';
import { UserModule } from './user/user.module';
import { StarModule } from './match/star.module';
import { AuthGuard } from "./auth/auth.guard";
import { FirebaseApp } from "./firebase/firebase.app";
import { AuthModule } from "./auth/auth.module";
import { EavAttributeType } from './eav/eav.attribute.type';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'soccer_fly',
      entities: [UserEntity, StarMatch, CrawlLiveContent, EavAttributeType, EavAttribute],
      synchronize: true,
    }),
    UserModule,
    StarModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
      AppService,
      FirebaseApp
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthGuard).forRoutes({
      path: '/auth/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthGuard).forRoutes({
      path: '/star/*',
      method: RequestMethod.ALL,
    });
    consumer.apply(AuthGuard).forRoutes({
      path: '/user/*',
      method: RequestMethod.ALL,
    });
  }
}
