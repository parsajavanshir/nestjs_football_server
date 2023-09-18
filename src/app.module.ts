import { CrawlLiveContent } from './crawl/entity/live_content.entity';
import { MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { StarMatch } from './match/entity/star.entity';
import { UserModule } from './user/user.module';
import { StarModule } from './match/star.module';
import { AuthGuard } from "./auth/auth.guard";
import { FirebaseApp } from "./firebase/firebase.app";
import { AuthModule } from "./auth/auth.module";
import { BotModule } from './bot-random/bot.module';
import {BotRandomEntity} from "./bot-random/entity/bot.entity";
import {BotEavAttributeValue} from "./bot-random/entity/bot.eav.attribute.value";
import { EavAttribute } from './eav/entity/eav.attribute';
import { EavAttributeType } from './eav/entity/eav.attribute.type';
import {NewMatchEntity} from "./match/entity/new.match.entity";
import {MatchEavAttributeValue} from "./match/entity/match.eav.attribute.value";
import {LeagueEntity} from "./league/league.entity";
import { BotListItem } from './bot-random/entity/bot.list.item';
import { BotListEntity } from './bot-random/entity/bot.list.entity';
import {EavModule} from "./eav/eav.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3309,
      username: 'root',
      password: 'admin123',
      database: 'soccer_fly',
      entities: [
          UserEntity, StarMatch, CrawlLiveContent, NewMatchEntity, MatchEavAttributeValue, LeagueEntity,
        BotRandomEntity, EavAttribute, EavAttributeType, BotEavAttributeValue, BotListItem, BotListEntity],
      synchronize: true,
    }),
    UserModule,
    StarModule,
    AuthModule,
    BotModule,
    EavModule
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
