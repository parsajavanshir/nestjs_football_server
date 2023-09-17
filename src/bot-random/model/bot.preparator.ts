import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import { NewMatchEntity } from '../../match/entity/new.match.entity';
import { BotListEntity } from '../entity/bot.list.entity';
import { BotListItem } from '../entity/bot.list.item';

@Injectable()
export class BotPreparator {
    WHERE_CLAUSE = ['odd', 'over_under', 'league_name'];
    LIMIT_CLAUSE = ['match_amount'];
    ALL_ODD = 'all_odd';
    MATCH_AMOUNT = 'match_amount';
    MIN_TOTAL_MATCH = 'min_total_match';
    TEAM_POSITION = ['position_range_of_first_team', 'position_range_of_second_team'];


    constructor(
        @InjectDataSource() private dataSource: DataSource,
      ) { }

    /**
     * prepare query
     */
    async prepareDataMatchRandomBySql(botId: number, botEavValues: object)
    {
        // remove match entity id already in the bot
        let matchData =  await (await this.prepareQueryForMatchWithBotEqualCondition(botId, botEavValues))
                        .getMany();
        if (matchData.length < botEavValues[this.MIN_TOTAL_MATCH]) {
            return [];
        }
        return matchData;
    }

    /**
     * prepare query remove match entity id already in the bot
     */
    async prepareQueryForMatchWithBotEqualCondition(botId: number, botEavValues: object)
    {
        let allMatchOfBot = this.dataSource
        .createQueryBuilder(BotListItem, "botListItem")
        .select(['botListItem.match_id'])
        .innerJoin(BotListEntity, "botListEntity", "botListEntity.list_id = botListItem.list_id")
        .where("botListEntity.bot_id = " + botId);
        let matchData = this.dataSource
        .createQueryBuilder(NewMatchEntity, "match")
        .select(['match.entity_id', 'match.odd', 'match.over_under'])
        .leftJoin("(" + allMatchOfBot.getQuery() + ")", "allMatchOfBot", "allMatchOfBot.botListItem_match_id = match.entity_id")
        .where("allMatchOfBot.botListItem_match_id IS NULL");

        matchData = await this.prepareConditionKey(botEavValues, matchData);

        return matchData;
    }

    async prepareConditionKey(botEavValues: object, matchData: SelectQueryBuilder<NewMatchEntity>)
    {
        let isSetWhereClause = false;
        let self = this;
        Object.keys(botEavValues).forEach(function(key) {
            if (self.WHERE_CLAUSE.includes(key) && !isSetWhereClause) {
                matchData.andWhere("match." + key + " IN (:...values)", { values: botEavValues[key]});
                isSetWhereClause = true;
            } else if (self.WHERE_CLAUSE.includes(key) && isSetWhereClause) {
                matchData.andWhere("match." + key + " IN (:...values)", { values: botEavValues[key]});
            }
        });

        return matchData;
    }
}