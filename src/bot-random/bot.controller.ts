import { Body, Controller, Post, Get } from '@nestjs/common';
import {BotService} from "./bot.service";
import { CreateBotDTO, GetBotStatusDTO } from './dto';

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

    @Post('generate-random-bot-match-single-bet')
    generateBotMatchSingleAttribute() {
        return this.botService.generateBotMatchSingleAttribute();
    }

    @Post('reset-bot-for-new-day')
    resetBotForNewDay() {
        // set crawled_today = 0
        return this.botService.resetBotForNewDay();
    }

    @Post('unlock-bot-for-exception')
    resetIsLockingWhenHaveException() {
        // set crawled_today = 0
        return this.botService.unstuckBotLocking();
    }

    @Get('get-bot-ui')
    getBotUI() {
        // set crawled_today = 0
        return this.botService.getBotUI();
    }

    @Post('get-bot-list-status')
    getBotListStatus(@Body() getBotStatusDTO: GetBotStatusDTO) {
        return this.botService.getBotListStatus(JSON.parse(getBotStatusDTO.bot_ids));
    }
}
