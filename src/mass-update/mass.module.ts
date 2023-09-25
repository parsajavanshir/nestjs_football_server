import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotListEntity } from '../bot-random/entity/bot.list.entity';
import { BotListItem } from '../bot-random/entity/bot.list.item';
import { MassService } from './mass.service';
import { MassController } from './mass.controller';
import { MassResource } from './model/mass.resource';
import { MassUpdate } from './entity/mass.update';
import { BotResource } from '../bot-random/model/bot.resource';
import { BotRandomEntity } from '../bot-random/entity/bot.entity';
import { EavAttribute } from '../eav/entity/eav.attribute';
import { BotEavAttributeValue } from '../bot-random/entity/bot.eav.attribute.value';
import { MassProcessor } from './model/mass.processor';

@Module({
    imports: [
        TypeOrmModule.forFeature([BotListEntity]),
        TypeOrmModule.forFeature([BotListItem]),
        TypeOrmModule.forFeature([MassUpdate]),
        TypeOrmModule.forFeature([BotRandomEntity]),
        TypeOrmModule.forFeature([EavAttribute]),
        TypeOrmModule.forFeature([BotEavAttributeValue]),
    ],
    controllers: [MassController],
    providers: [MassService, MassResource, BotResource, MassProcessor]
})
export class MassModule {}
