import { BotGenerator } from './model/bot.generator';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {BotRandomEntity} from "./entity/bot.entity";
import { BotEavAttributeValue } from './entity/bot.eav.attribute.value';
import { CreateBotDTO } from './dto';
import { BotResource } from './model/bot.resource';
import { BotBuilder } from './model/bot.builder';
import { EavAttributeValueDTO } from './dto';

@Injectable()
export class BotService {
    odd_range = 0;
    start_over_under_value = 3.75;
    over_under_range = 3.75;
    all_odd = true;
    league_name = [];
    bettingObj = [
        'min_total_match', 'odd', 'over_under'
    ]
    match_amount = 4;
    min_total_match_default =  6;
    min_total_match_range = {min: 5,max: 10};
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
    ];
    bet_in_match = ['over', 'under', 'favorite', 'underdog'];

    constructor(
        @InjectRepository(BotRandomEntity)
        private bothRepository: Repository<BotRandomEntity>,
        @InjectRepository(BotEavAttributeValue)
        private botEavAttributeValueRepository: Repository<BotEavAttributeValue>,
        private botGenerator: BotGenerator,
        private botResource: BotResource,
        private botBuilder: BotBuilder,
    ) {}

    // save star match
    // NOTE: with odd = 0 => do not have stronger team

    // create single bot with odd and over/under
    async createSingleBot(createBotDTO: CreateBotDTO) {
        if (createBotDTO.token !== 'huykuy99') {
            return 'False';
        }
        let overUnderData = this.generateOverUnderArray();
        let oddData =  this.generateOddArray();
        let dataEav = this.generateBulkRandomOdd(oddData, overUnderData);
        let maxBotId;
        var eavStorage = {};
        let isAbnormal = false;
        try {
            console.log('====================================');
            console.log(dataEav);
            console.log('====================================');
            await Promise.all(dataEav.map(async (botEav) => {
                await Promise.all(botEav.map(async (attrObj) => {
                    let attributeCode = Object.keys(attrObj)[0];
                    let attributeId = await this.botResource.findEavIdByCode(attributeCode);
                    if (eavStorage.hasOwnProperty(attributeCode)){
                        attributeId = eavStorage[attributeCode];
                    } else {
                        attributeId = await this.botResource.findEavIdByCode(attributeCode);
                        eavStorage[attributeCode] = attributeId;
                    }
                }));
            }));
            // console.log('====================================');
            // console.log(eavStorage);
            // console.log('====================================');

            for (const botEav of dataEav) {
                console.log('start');
                let maxBotId = await this.botResource.getMaxBotId();
                let botName = this.botGenerator.generatorBotName(maxBotId);
                let newBot = await this.bothRepository.save({name: botName});
                let eavDataOfBot = {};
                let attributeOfBot = [];

                for (let i = 0; i < botEav.length; i++) {
                    let attributeCode = Object.keys(botEav[i])[0];
                    let attributeId = eavStorage[attributeCode];
                    attributeOfBot.push(attributeId);
                    if (eavDataOfBot.hasOwnProperty(attributeCode)){
                        eavDataOfBot[attributeId][attributeCode].push(botEav[i][attributeCode]);
                    } else {
                        eavDataOfBot[attributeId] = {};
                        eavDataOfBot[attributeId][attributeCode] = [botEav[i][attributeCode]];
                    }
                }

                for (const attrId of attributeOfBot) {
                    let valueBotEav = JSON.stringify(eavDataOfBot[attrId]);
                    await this.botEavAttributeValueRepository.save(
                        {
                            attribute_id: attrId,
                            entity_id: newBot.entity_id,
                            value: valueBotEav
                        })
                }
                console.log('end');
            }

          } catch (error) {
            console.log('====================error================');
            console.log(error);
            console.log('======================error==============');
            maxBotId = false;
            isAbnormal = error;
          }
        
        if (isAbnormal) {
            return isAbnormal;
        }
        return "SUCCESS";
    }

    addMinTotalMatch()
    {

    }

    generateBulkRandomOdd(oddData, overUnderData)
    {
        let allOdd = oddData.concat(overUnderData);
        let combine = this.getCombinations(allOdd, 4);
        let dataWithBetInMatch = [];
        //add bet in match data
        this.bet_in_match.forEach(elememt => {
            combine.forEach(elem => {
                let obj = {};
                let flag = [...elem];
                obj["bet_in_match"] = elememt;

                let objMinTotal = {};
                objMinTotal["min_total_match"] = this.min_total_match_default;

                let objMatchAmount = {};
                objMatchAmount["match_amount"] = this.match_amount;
                flag.push(obj, objMinTotal, objMatchAmount);
                dataWithBetInMatch.push(flag);
            })
        });
        return dataWithBetInMatch;
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

        //will take long time
        // combi.sort((a, b) => a.length - b.length);
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

    generateOverUnderArray() {
        let overUnderArr = [];
        let value = this.start_over_under_value;
        while (value <= this.over_under_range) {
            let obj = {};
            obj['over_under'] = value;
            overUnderArr.push(obj);
            value += 0.25;
        }

        return overUnderArr;
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
}
