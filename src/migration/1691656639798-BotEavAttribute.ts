import { MigrationInterface, QueryRunner } from "typeorm"
import {BotEavAttribute} from "../bot-random/bot.eav.attribute";

export class BotEavAttribute1691656639798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const botEavRepo = queryRunner.connection.getRepository(BotEavAttribute);

        await botEavRepo.insert([
            {
                attribute_code: 'match_amount',
                frontend_label: 'Number of match in the streak',
                type_input: 'number'
            },{
                attribute_code: 'odd',
                frontend_label: 'Odd of match',
                type_input: 'number'
            },{
                attribute_code: 'over',
                frontend_label: 'Over',
                type_input: 'number'
            },{
                attribute_code: 'under',
                frontend_label: 'Under',
                type_input: 'number'
            },{
                attribute_code: 'all_odd',
                frontend_label: 'All odds',
                type_input: 'checkbox'
            },{
                attribute_code: 'specific_odds',
                frontend_label: 'Some specific odds',
                type_input: 'object'
            },{
                attribute_code: 'league_name',
                frontend_label: 'League name',
                type_input: 'text'
            },{
                attribute_code: 'position_range',
                frontend_label: 'Range of teams position',
                type_input: 'text'
            },{
                attribute_code: 'subcriber_amount',
                frontend_label: 'Total subcribers',
                type_input: 'number'
            },{
                attribute_code: 'longest_winning_streak',
                frontend_label: 'Longest winning streaks',
                type_input: 'number'
            },{
                attribute_code: 'longest_losing_streak',
                frontend_label: 'Longest losing streaks',
                type_input: 'number'
            },{
                attribute_code: 'win_match_amount',
                frontend_label: 'Win',
                type_input: 'number'
            },{
                attribute_code: 'lose_match_amount',
                frontend_label: 'Lose',
                type_input: 'number'
            },{
                attribute_code: 'min_total_match',
                frontend_label: 'Minimum number of matches need to generate the streak',
                type_input: 'number'
            }
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
