import {DataSource} from "typeorm";
import {UserEntity} from "./user/entity/user.entity";
import {StarMatch} from "./match/entity/star.entity";
import {CrawlLiveContent} from "./crawl/entity/live_content.entity";
import {BotRandomEntity} from "./bot-random/entity/bot.entity";
import {BotEavAttributeValue} from "./bot-random/entity/bot.eav.attribute.value";
import {NewMatchEntity} from "./match/entity/new.match.entity";
import {EavAttribute} from "./eav/entity/eav.attribute";
import {EavAttributeType} from "./eav/entity/eav.attribute.type";
import {MatchEavAttributeValue} from "./match/entity/match.eav.attribute.value";
import {LeagueEntity} from "./league/league.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3309,
    username: "root",
    password: "admin123",
    database: "soccer_fly",
    synchronize: true,
    logging: true,
    entities: [
        UserEntity, StarMatch, CrawlLiveContent, NewMatchEntity, MatchEavAttributeValue, LeagueEntity,
        BotRandomEntity, EavAttribute, EavAttributeType, BotEavAttributeValue],
    migrations: ['./src/migration/*.ts']
})