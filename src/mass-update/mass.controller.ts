import { Body, Controller, Post, Get } from '@nestjs/common';
import { MassService } from './mass.service';

@Controller('mass')
export class MassController {
    constructor(protected massService: MassService) {}

    //curl -X POST -d 'token=huykuy99' http://localhost:3002/bot/create-bot
    @Post('update-bot-list-status')
    createBotRandom() {
        return this.massService.updateBotListStatus();
    }
}
