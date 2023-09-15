import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import { NewMatchEntity } from 'src/match/entity/new.match.entity';

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
    async prepareDataMatchRandomBySql(botEavValues: object)
    {
        let matchData =  await (await this.prepareQueryForMatchWithBotEqualCondition(botEavValues))
                        // .orderBy('RANDOM()')
                        .take(botEavValues[this.MATCH_AMOUNT])
                        // .getQuery();
                        .getMany();
        console.log('====================================');
        console.log(matchData);
        console.log('====================================');
        if (matchData.length < botEavValues[this.MIN_TOTAL_MATCH]) {
            return [];
        }
        return matchData;
    }

    /**
     * prepare query
     */
    async prepareQueryForMatchWithBotEqualCondition(botEavValues: object)
    {
        let matchData = this.dataSource
        .createQueryBuilder(NewMatchEntity, "match")
        .select(['match']);
        matchData = await this.prepareConditionKey(botEavValues, matchData);
        // return matchData.getMany();
        return matchData;
    }

    async prepareConditionKey(botEavValues: object, matchData: SelectQueryBuilder<NewMatchEntity>)
    {
        let isSetWhereClause = false;
        let self = this;
        Object.keys(botEavValues).forEach(function(key) {
            if (self.WHERE_CLAUSE.includes(key) && !isSetWhereClause) {
                matchData.where("match." + key + " IN (:...values)", { values: botEavValues[key]});
                isSetWhereClause = true;
            } else if (self.WHERE_CLAUSE.includes(key) && isSetWhereClause) {
                // matchData.andWhere("match." + key + " IN (:...values)", { values: botEavValues[key]});
            }
        });

        return matchData;
    }
}