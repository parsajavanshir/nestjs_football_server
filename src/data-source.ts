import {DataSource} from "typeorm";
import {UserEntity} from "./user/user.entity";
import {StarMatch} from "./match/star.entity";
import {CrawlLiveContent} from "./crawl/live_content.entity";
import {BotRandomEntity} from "./bot-random/bot.entity";
import {BotEavAttribute} from "./bot-random/bot.eav.attribute";
import {BotEavAttributeValue} from "./bot-random/bot.eav.attribute.value";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3309,
    username: "root",
    password: "admin123",
    database: "soccer_fly",
    synchronize: true,
    logging: true,
    entities: [UserEntity, StarMatch, CrawlLiveContent, BotRandomEntity, BotEavAttribute, BotEavAttributeValue],
    migrations: ['./src/migration/*.ts']
})