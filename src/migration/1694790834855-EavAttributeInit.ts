import { MigrationInterface, QueryRunner } from "typeorm"
import {EavAttributeType} from "../eav/entity/eav.attribute.type";
import {EavAttribute} from "../eav/entity/eav.attribute";

export class EavAttributeInit1694790834855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const eavTypeRepo = queryRunner.connection.getRepository(EavAttributeType);
        const eavRepo = queryRunner.connection.getRepository(EavAttribute);

        await eavTypeRepo.insert([
            {
                entity_type_code: 'bot_random',
                entity_table: 'bot_random_entity',
            },{
                entity_type_code: 'new_match',
                entity_table: 'new_match_entity',
            }
        ]);

        let eavTypeBotRandom = await eavTypeRepo.findOne({
            where: {
                entity_type_code: 'bot_random'
            },
        });

        let eavTypeNewMatch = await eavTypeRepo.findOne({
            where: {
                entity_type_code: 'new_match'
            },
        });


        await eavRepo.insert([
            {
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'match_amount',
                attribute_label: 'Number of match in the streak',
                type_input: 'number'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'odd',
                attribute_label: 'Odds of match',
                type_input: 'multiselect'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'over_under',
                attribute_label: 'Over/Under',
                type_input: 'multiselect'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'all_odd',
                attribute_label: 'All odds',
                type_input: 'boolean'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'league_name',
                attribute_label: 'League name',
                type_input: 'multiselect'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'position_range_of_first_team',
                attribute_label: 'Position range of home team',
                type_input: 'object'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'position_range_of_second_team',
                attribute_label: 'Position range of away team',
                type_input: 'object'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'subcriber_amount',
                attribute_label: 'Total subcribers',
                type_input: 'number'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'longest_winning_streak',
                attribute_label: 'Longest winning streaks',
                type_input: 'number'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'longest_losing_streak',
                attribute_label: 'Longest losing streaks',
                type_input: 'number'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'win_match_amount',
                attribute_label: 'Win',
                type_input: 'number'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'lose_match_amount',
                attribute_label: 'Lose',
                type_input: 'number'
            },{
                type_id: eavTypeBotRandom.entity_type_id,
                attribute_code: 'min_total_match',
                // validate UI have to bigger than match_amount
                attribute_label: 'Minimum number of matches need to generate the streak',
                type_input: 'number'
            },{
                type_id: eavTypeNewMatch.entity_type_id,
                attribute_code: 'bet_in_match',
                // validate UI have to bigger than match_amount
                attribute_label: 'Define the betting streak',
                type_input: 'multiselect'
            }
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
