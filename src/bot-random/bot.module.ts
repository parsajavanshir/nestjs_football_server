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
import { BotCreator } from './model/bot.creator';
import { BotGetter } from './model/bot.getter';
import { BotRefactor } from './model/bot.refactor';
import { BotPreparator } from './model/bot.preparator';

@Module({
    imports: [
        TypeOrmModule.forFeature([BotRandomEntity]),
        TypeOrmModule.forFeature([BotEavAttributeValue]),
        TypeOrmModule.forFeature([EavAttribute]),
    ],
    controllers: [BotController],
    providers: [BotService, BotResource, BotGenerator, BotBuilder, BotCreator, BotGetter, BotRefactor, BotPreparator]
})
export class BotModule {}
