import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {BotRandomEntity} from "./entity/bot.entity";
import {BotController} from "./bot.controller";
import {BotService} from "./bot.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([BotRandomEntity])
    ],
    controllers: [BotController],
    providers: [BotService]
})
export class BotModule {}
