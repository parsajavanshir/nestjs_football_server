import { Injectable } from '@nestjs/common';
import { DataSource, Repository, IsNull, Not } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BotListEntity } from '../../bot-random/entity/bot.list.entity';
import { MassUpdate } from '../entity/mass.update';
import { BotRandomEntity } from 'src/bot-random/entity/bot.entity';
import { MassProcessor } from './mass.processor';
import { BotListItem } from 'src/bot-random/entity/bot.list.item';

@Injectable()
export class MassResource {
    BET_IN_MATCH = "bet_in_match";

    constructor(
        @InjectRepository(BotListEntity)
        private botListEntityRepository: Repository<BotListEntity>,
        @InjectRepository(BotListItem)
        private botListItemRepository: Repository<BotListItem>,
        @InjectRepository(MassUpdate)
        private massUpdateRepository: Repository<MassUpdate>,
        @InjectRepository(BotRandomEntity)
        private botRepository: Repository<BotRandomEntity>,
        private massProcessor: MassProcessor,
        @InjectDataSource() private dataSource: DataSource,
    ) {}

    async updateBotListStatus() : Promise<any>
    {
        let botList = await this.botListEntityRepository.find({
            where: {
                status: IsNull()
            },
            take: 2000
        });

        let botData = {};
        let listItemData, betInMatch, result;
        for (let i = 0; i < botList.length; i++) {
            let botId = botList[i]["bot_id"];
            let listId = botList[i]["list_id"];
            if (botData.hasOwnProperty(botId)) {
                betInMatch = botData[botId];
            } else {
                betInMatch = await this.getBetInMatchValueOfBot(botId);
            }
            listItemData = await this.getMatchDataOfList(listId);
            if (betInMatch) {
                let canUpdateStatus = true;
                let status = 0;
                for (const index in listItemData) {
                    if (listItemData[index].match.matchResult == null) {
                        canUpdateStatus = false;
                        break;
                    }
                    let homeResult = listItemData[index].match.matchResult?.home_result;
                    let awayResult = listItemData[index].match.matchResult?.away_result;
                    let odd = listItemData[index].match.odd;
                    let overUnder = listItemData[index].match.over_under;
                    let homePosition = listItemData[index].match.home_position;
                    let awayPosition = listItemData[index].match.away_position; 
                    result = this.massProcessor.processMatchResult(betInMatch, homeResult, awayResult, homePosition, awayPosition, odd, overUnder);
                    if (result == this.massProcessor.UNDEFINED) {
                        canUpdateStatus = false;
                        break;
                    }
                    if (result == this.massProcessor.WIN_FULL) {
                        status = 1;
                        break;
                    }
                }

                if (canUpdateStatus) {
                    this.botListEntityRepository.save(
                        {
                            list_id: listId,
                            bot_id: botId,
                            status: status
                        }
                    )
                }
            }
        }
        
        return "UPDATE BOT LIST DONE";
    }

    async getMatchDataOfList(list_id: number) : Promise<any>
    {
        let botItemData = await this.botListItemRepository.find({
            relations: {
                match: {
                    matchResult: true
                }
            },
            where: {
                list_id: list_id
            }
        });

        return botItemData;
    }

    async getBetInMatchValueOfBot(bot_id: number) : Promise<any>
    {
        let bot = await this.botRepository.find({
            relations: {
                botEavValues: true,
            },
            where: {
                entity_id: bot_id
            },
            take: 1
        });
        let betInMatch = null;
        bot[0]["botEavValues"].forEach((eav) => {
            let value = JSON.parse(eav.value);
            let firstKey = Object.keys(value)[0];
            if (firstKey === this.BET_IN_MATCH) {
              betInMatch = value[firstKey][0];
            }
        })

        return betInMatch;
    }
}
