import { Injectable } from '@nestjs/common';

@Injectable()
export class BotChecker {
    checkValidTime(streak: Array<any>) {
        let canUseThisRandom = true;
        for (let i = 0; i < streak.length - 1; i++) {
            if (((+new Date(streak[i].datetime) - +new Date(streak[i + 1].datetime)) / 1000) > 7200) {
                canUseThisRandom = false;
                break;
            }
        }
    
        return canUseThisRandom;
    }

    checkSubDateValue(dateA, dateB, timeDistance = 7200) {
        let subValue = (+new Date(dateA) - +new Date(dateB)) / 1000;
        return subValue > timeDistance;
    }

    checkSubDateValueAbs(dateA, dateB, timeDistance = 7200) {
        let subValue = Math.abs(+new Date(dateA) - +new Date(dateB)) / 1000;
        return subValue > timeDistance;
    }
}