import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { BotRandomEntity } from '../entity/bot.entity';
import { BotEavAttributeValue } from '../entity/bot.eav.attribute.value';
import { merge } from 'lodash';
import { BotRefactor } from './bot.refactor';

@Injectable()
export class BotGetter {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        private botRefactor: BotRefactor,
      ) { }
    
    /**
     * build eav bot value
     */
    async getBotDataWithSingleAttribute()
    {
        let allBotRandom = await this.dataSource
        .createQueryBuilder(BotRandomEntity, "bot")
        .innerJoin("bot.botEavValues", "botEavValue")
        .select(['bot', 'botEavValue.value'])
        .getMany();
        allBotRandom = this.botRefactor.refactorBotDataEavValue(allBotRandom);

        return allBotRandom;
    }
}