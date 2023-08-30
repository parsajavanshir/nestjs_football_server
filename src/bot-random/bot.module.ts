import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {BotRandomEntity} from "./entity/bot.entity";
import { BotEavAttributeValue } from './entity/bot.eav.attribute.value';
import {BotController} from "./bot.controller";
import {BotService} from "./bot.service";
import { BotResource } from './model/bot.resource';
import { BotGenerator } from './model/bot.generator';
import { BotBuilder } from './model/bot.builder';
import { EavAttribute } from 'src/eav/entity/eav.attribute';

@Module({
    imports: [
        TypeOrmModule.forFeature([BotRandomEntity]),
        TypeOrmModule.forFeature([BotEavAttributeValue]),
        TypeOrmModule.forFeature([EavAttribute]),
    ],
    controllers: [BotController],
    providers: [BotService, BotResource, BotGenerator, BotBuilder]
})
export class BotModule {}
