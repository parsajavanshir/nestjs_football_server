import { Injectable } from '@nestjs/common';

@Injectable()
export class BotRefactor {
    /**
     * build eav bot value
     */
    refactorBotDataEavValue(data)
    {
        data.forEach(bot => {
            let botEavValues = {};
            bot["botEavValues"].forEach(eavValue => {
                let valueObj = JSON.parse(eavValue["value"]);
                let firstKey = Object.keys(valueObj)[0];
                botEavValues[firstKey] = valueObj[firstKey];
            })

            bot["botEavValues"] = botEavValues;
        });
         return data;
    }
}