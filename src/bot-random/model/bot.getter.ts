import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BotRandomEntity } from '../entity/bot.entity';
import { BotEavAttributeValue } from '../entity/bot.eav.attribute.value';
import { merge } from 'lodash';
import { BotRefactor } from './bot.refactor';

@Injectable()
export class BotGetter {
    constructor(
        @InjectDataSource() private dataSource: DataSource,
        private botRefactor: BotRefactor,
        @InjectRepository(BotRandomEntity)
        private botRepository: Repository<BotRandomEntity>,
      ) { }
    
    /**
     * build eav bot value
     */
    async getBotDataWithSingleAttribute()
    {
        // get Top 100 bot
        let top100Bot = await this.botRepository.find({
            where: {
                crawled_today: 0,
            },
            relations: {
                botEavValues: true,
            },
            take: 200,
            skip: 0,
        });
        let allBotRandom = this.botRefactor.refactorBotDataEavValue(top100Bot);

        return allBotRandom;
    }
}