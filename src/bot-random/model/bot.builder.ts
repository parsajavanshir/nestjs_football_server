import { Injectable } from '@nestjs/common';

@Injectable()
export class BotBuilder {
    /**
     * build eav bot value
     */
    buildEavBotValue()
    {
        return "BOT_"; 
    }
}