import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, LessThan } from 'typeorm';
import { BotRandomEntity } from '../entity/bot.entity';
import { BotRefactor } from './bot.refactor';
import { BotResource } from './bot.resource';

@Injectable()
export class BotGetter {

    max_crawl = 5;

    constructor(
        @InjectDataSource() private dataSource: DataSource,
        private botRefactor: BotRefactor,
        private botResource: BotResource,
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
                crawled_today: LessThan(this.max_crawl),
                is_locking: 0,
            },
            relations: {
                botEavValues: true,
            },
            order: {
                crawled_today: "ASC",
                entity_id: "ASC",
            },
            take: 500,
            skip: 0,
        });

        let botIds = [];
        top100Bot.forEach(bot => {
            botIds.push(bot.entity_id);
        })
        // lock bot ids
        await this.botResource.lockBotDataInQueue(botIds);
        let allBotRandom = this.botRefactor.refactorBotDataEavValue(top100Bot);

        return allBotRandom;
    }
}