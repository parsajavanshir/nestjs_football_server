import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {BotRandomEntity} from "./entity/bot.entity";
import { CreateBotDTO } from './dto';

@Injectable()
export class BotService {
    odd_range = 1.5;
    over_under_range = 3.75;
    all_odd = true;

    league_name = [];

    bettingObj = [
        'min_total_match', 'odd', 'over_under'
    ]
    match_amount = 4;
    min_total_match_range = {
        min: 5,
        max: 10
    };
    position_range = {
        from: 1,
        to: 10
    };

    other_bet_options = [
        'over',
        'under',
        'favorite',
        'underdog',
        'random_each_match',
        'none'
    ]

    bet_in_match = [
        'over',
        'under',
        'favorite',
        'underdog'
    ]


    constructor(
        @InjectRepository(BotRandomEntity)
        private starMatchRepository: Repository<BotRandomEntity>,
    ) {}

    // save star match
    // NOTE: with odd = 0 => do not have stronger team

    // create single bot with odd and over/under
    async createSingleBot(createBotDTO: CreateBotDTO) {
        if (createBotDTO.token !== 'huykuy99') {
            return 'False';
        }
        let overUnderData =  this.generateOverUnderArray();
        let oddData =  this.generateOddArray();
        let minTotalMatch =  this.generateMinTotalMatchArray();
        overUnderData.forEach(elem => {
            let attributeData = {};
            attributeData['over_under'] = elem;
            attributeData['match_amount'] = this.match_amount;
        });
    }

    prepareBettingObject()
    {
        let bettingObj = this.getCombinations(this.bettingObj, 4);
        let data = [];
        this.bet_in_match.forEach(elememt => {
            bettingObj.forEach(elem => {
                let obj = {};
                let flag = [...elem];
                obj["bet_in_match"] = elememt;
                flag.push(obj);
                data.push(flag);
            });
        });
    }

    getCombinations(valuesArray, max = 0)
    {
        var combi = [];
        var temp = [];
        var slent = Math.pow(2, valuesArray.length);

        for (var i = 1; i < slent; i++)
        {
            temp = [];
            for (var j = 0; j < valuesArray.length; j++)
            {
                if ((i & Math.pow(2, j)))
                {
                    temp.push(valuesArray[j]);
                }
            }

            if (!temp.length) {
                continue;
            }

            if (max === 0 || (max && temp.length <= max)) {
                combi.push(temp);
            }
        }
        combi.sort((a, b) => a.length - b.length);
        return combi;
    }

    generateOddArray() {
        let oddArr = [];
        let odd = -this.odd_range;
        while (odd <= this.odd_range) {
            let obj = {};
            obj['odd'] = odd;
            oddArr.push(obj);
            odd += 0.25;
        }

        return oddArr;
    }

    generateMinTotalMatchArray() {
        let arr = [];
        let min = this.min_total_match_range.min;
        let max = this.min_total_match_range.max;
        while (min <= max) {
            let obj = {};
            obj['min_total_match'] = min;
            arr.push(obj);
            min ++;
        }
        return arr;
    }

    generateOverUnderArray() {
        let overUnderArr = [];
        let value = 1.5;
        while (value <= this.over_under_range) {
            let obj = {};
            obj['over_under'] = value;
            overUnderArr.push(obj);
            value += 0.25;
        }

        return overUnderArr;
    }
}
