import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {BotRandomEntity} from "./entity/bot.entity";
import { CreateBotDTO } from './dto';

@Injectable()
export class BotService {
    odd_range = 8;
    over_under_range = 8;
    all_odd = true;
    league_name = [];
    position_range = {
        from: 1,
        to: 10
    };

    bet_result = [
        'over',
        'under',
        'odd',
        'both_team_score'
    ]


    constructor(
        @InjectRepository(BotRandomEntity)
        private starMatchRepository: Repository<BotRandomEntity>,
    ) {}

    // save star match
    // NOTE: with odd = 0 => do not have stronger team
    async createBot(createBotDTO: CreateBotDTO) {
        if (createBotDTO.token !== 'huykuy99') {
            return 'False';
        }
        return this.generateOverUnderArray();
    }

    generateOddArray(): object {
        let oddArr = [];
        let odd = -this.odd_range;
        while (odd <= this.odd_range) {
            oddArr.push(odd);
            odd += 0.25;
        }

        return oddArr;
    }

    generateOverUnderArray(): object {
        let overUnderArr = [];
        let value = 0.5;
        while (value <= this.over_under_range) {
            overUnderArr.push(value);
            value += 0.25;
        }

        return overUnderArr;
    }
}
