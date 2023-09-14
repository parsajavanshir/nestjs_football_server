import { Injectable } from '@nestjs/common';

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


    generateBotMatchSingleAttribute()
    {
        return [];
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