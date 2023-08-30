import { Injectable } from '@nestjs/common';

@Injectable()
export class BotGenerator {
    /**
     * generate bot name
     */
    generatorBotName(max_id: number)
    {
        return "BOT_" + max_id; 
    }
}