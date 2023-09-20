import { Injectable } from '@nestjs/common';
import { CreateBotDTO } from './dto';
import { BotCreator } from './model/bot.creator';
import { BotGetter } from './model/bot.getter';
import { BotGenerator } from './model/bot.generator';
import { BotResource } from './model/bot.resource';

@Injectable()
export class BotService {
    constructor(
        public botCreator: BotCreator,
        public botGetter: BotGetter,
        public botGenerator: BotGenerator,
        public botResource: BotResource,
    ) {}

    // save star match
    // NOTE: with odd = 0 => do not have stronger team
    // create single bot with odd and over/under
    async createBots(createBotDTO: CreateBotDTO) {
        if (createBotDTO.token !== 'huykuy99') {
            return '';
        }
        let result = this.botCreator.createBots();
        return result;
    }

    async getBotDataWithSingleAttribute() {
        const result = await this.botGetter.getBotDataWithSingleAttribute();
        return result;
    }

    async generateBotMatchSingleAttribute() {
        const result = await this.botGenerator.generateBotMatchSingleAttribute();
        return result;
    }

    async resetBotForNewDay() {
        const result = await this.botResource.resetCrawledToday();
        return result;
    }

    async unstuckBotLocking() {
        const result = await this.botResource.unstuckBotLocking();
        return result;
    }

    async getBotUI() {
        const data = await this.botResource.getBotUIData();
        return data;
    }
}
