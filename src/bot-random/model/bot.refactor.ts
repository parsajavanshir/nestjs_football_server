import { Injectable } from '@nestjs/common';

@Injectable()
export class BotRefactor {
    /**
     * build eav bot value
     */
    refactorBotDataEavValue(data)
    {
        data.forEach(bot => {
            let botEavValues = [];
            bot["botEavValues"].forEach(eavValue => {
                botEavValues.push(JSON.parse(eavValue["value"]));
            })

            bot["botEavValues"] = botEavValues;
        });
         return data;
    }
}