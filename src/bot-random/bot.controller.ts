import { Body, Controller, Post } from '@nestjs/common';
import {BotService} from "./bot.service";
import { CreateBotDTO } from './dto';

@Controller('bot')
export class BotController {
    constructor(protected botService: BotService) {}

    //curl -X POST -d 'token=huykuy99' http://localhost:3002/bot/create-bot
    @Post('create-bot')
    saveStarMatchForUser(@Body() createBotDTO: CreateBotDTO) {
        return this.botService.createBot(createBotDTO);
    }
}
