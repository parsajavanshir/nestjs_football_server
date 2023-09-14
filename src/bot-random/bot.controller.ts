import { Body, Controller, Post, Get } from '@nestjs/common';
import {BotService} from "./bot.service";
import { CreateBotDTO } from './dto';

@Controller('bot')
export class BotController {
    constructor(protected botService: BotService) {}

    //curl -X POST -d 'token=huykuy99' http://localhost:3002/bot/create-bot
    @Post('create-bot')
    createBotRandom(@Body() createBotDTO: CreateBotDTO) {
        return this.botService.createBots(createBotDTO);
    }

    @Get('get-all-bot')
    getAllBotRandom() {
        return this.botService.getBotDataWithSingleAttribute();
    }

    @Post('generate-bot-match-single')
    generateBotMatchSingleAttribute() {
        return this.botService.generateBotMatchSingleAttribute();
    }
}
