import { Injectable } from '@nestjs/common';
import { BotGetter } from './bot.getter';
import { BotPreparator } from './bot.preparator';
import { BotChecker } from './bot.checker';
import { BotResource } from './bot.resource';

@Injectable()
export class BotGenerator {
    odd_range = 0;
    start_over_under_value = 3.75;
    over_under_range = 3.75;
    all_odd = true;
    league_name = [];
    bettingObj = [
        'min_total_match', 'odd', 'over_under'
    ]
    min_total_match_range = {min: 5,max: 10};
    bet_in_match = ['over', 'under', 'favorite', 'underdog'];
    match_amount = 4;
    min_total_match_default =  6;

    constructor(
        private botGetter: BotGetter,
        private botPreparator: BotPreparator,
        private botChecker: BotChecker,
        private botResource: BotResource,
      ) { }

    async generateBotMatchSingleAttribute()
    {
        let dataBotEav = await this.botGetter.getBotDataWithSingleAttribute();
        let matchForBotList: Array<any>, matchData: Array<any>, botId: number;

        for (const index in dataBotEav) {
            matchForBotList = [];
            matchData = [];
            botId = dataBotEav[index]["entity_id"];
            // console.log('===============botEavValues=====================');
            // console.log(dataBotEav[index]);
            // console.log('================botEavValues====================');
            matchData = await this.botPreparator.prepareDataMatchRandomBySql(botId, dataBotEav[index]["botEavValues"]);
            matchForBotList = this.generateRandomMatch(matchData, dataBotEav[index]["botEavValues"]["match_amount"][0]);

            if (matchForBotList.length > 0) {
                await this.botResource.insertMatchForBotList(botId, matchForBotList);
            }
            // console.log('====================================');
            // console.log(matchForBotList);
            // console.log('====================================');
        }

        return matchForBotList;
    }

    generateRandomMatch(matchs, match_count) {
        let maxFailCount = 1000;
        let failCount = 0;
        let streak;
        let totalStreak = [];
        let dataRandom;
        while(failCount < maxFailCount) {
            dataRandom = this.generateRandom(matchs, match_count);
            streak = dataRandom[0];
            matchs = dataRandom[1];
            if (streak.length > 0 && streak.length === match_count) {
                totalStreak.push(streak);
                streak = [];
            }
            failCount++;
        }
        // console.log(totalStreak);
        return totalStreak;
    }

    generateRandom(arr, maxCount) {
        let arrBackup = [...arr];
        let randomIndex;
        let canUseThisArr = false;
        let count = 0;
        let arrStreak = [];
    
        if (arr.length < maxCount) {
            maxCount = arr.length;
        }
    
        if (arr.length === maxCount) {
            canUseThisArr = this.botChecker.checkValidTime(arr);
            if (!canUseThisArr) {
                return [[], arr];
            }
        }
    
        let maxFailCount = 1000;
        let failCount = 0;
    
        //if first value chosen is too large. we need to random again
        while (count < maxCount && failCount < maxFailCount) {
            randomIndex = Math.floor(Math.random() * arrBackup.length);
            if (arrStreak.length === 0) {
                arrStreak.push(arrBackup[randomIndex]);
                arrBackup.splice(randomIndex, 1);
                count++;
                continue;
            } else if (arrStreak.length === 1) {
                if (this.botChecker.checkSubDateValueAbs(arrBackup[randomIndex].datetime, arrStreak[0].datetime)) {
                    if (arrBackup[randomIndex].datetime > arrStreak[0].datetime) {
                        arrStreak.push(arrBackup[randomIndex]);
                    } else {
                        arrStreak.unshift(arrBackup[randomIndex]);
                    }
                    arrBackup.splice(randomIndex, 1);
                    this.botPreparator.prepareSortStreakMinToMax(arrStreak);
                    count++;
                    continue;
                }
            } else {
                let lastIndex = arrStreak.length - 1;
                if (this.botChecker.checkSubDateValue(arrStreak[0].datetime, arrBackup[randomIndex].datetime)) {
                    arrStreak.unshift(arrBackup[randomIndex]);
                    arrBackup.splice(randomIndex, 1);
                    count++;
                    continue;
                } else if (this.botChecker.checkSubDateValue(arrBackup[randomIndex].datetime, arrStreak[lastIndex].datetime)) {
                    arrStreak.push(arrBackup[randomIndex]);
                    arrBackup.splice(randomIndex, 1);
                    count++;
                    continue;
                }
            }
            failCount++;
        }
    
        if (failCount === maxFailCount || arrStreak.length < maxCount) {
            return [[], arr];
        }
        return [arrStreak, arrBackup];
    }

    /**
     * generate bot name
     */
    generatorBotName(max_id: number)
    {
        return "BOT_" + (max_id + 1); 
    }

    generateBulkRandomOdd(oddData, overUnderData)
    {
        let allOdd = oddData.concat(overUnderData);
        let combine = this.generateCombinations(allOdd, 4);
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

    /**
     * 
     * @returns array
     */
    generateCombinations(valuesArray, max = 0)
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

    /**
     * 
     * @returns array
     */
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

    /**
     * 
     * @returns array
     */
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

    /**
     * 
     * @returns array
     */
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