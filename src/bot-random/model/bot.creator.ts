import { Injectable } from '@nestjs/common';
import { BotGenerator } from './bot.generator';
import { BotResource } from './bot.resource';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotRandomEntity } from '../entity/bot.entity';
import { BotEavAttributeValue } from '../entity/bot.eav.attribute.value';

@Injectable()
export class BotCreator{
    constructor(
        @InjectRepository(BotRandomEntity)
        private bothRepository: Repository<BotRandomEntity>,
        @InjectRepository(BotEavAttributeValue)
        public botEavAttributeValueRepository: Repository<BotEavAttributeValue>,
        public botGenerator: BotGenerator,
        public botResource: BotResource,
    ) {}

    /**
     * generate bot
     */
    async createBots()
    {
        let overUnderData = this.botGenerator.generateOverUnderArray();
        let oddData =  this.botGenerator.generateOddArray();
        let dataEav = this.botGenerator.generateBulkRandomOdd(oddData, overUnderData);
        var eavStorage = {};
        let isAbnormal = false;
        try {
            await Promise.all(dataEav.map(async (botEav) => {
                await Promise.all(botEav.map(async (attrObj) => {
                    let attributeCode = Object.keys(attrObj)[0];
                    let attributeId;
                    if (eavStorage.hasOwnProperty(attributeCode)){
                        attributeId = eavStorage[attributeCode];
                    } else {
                        attributeId = await this.botResource.findEavIdByCode(attributeCode);
                        eavStorage[attributeCode] = attributeId;
                    }
                }));
            }));

            for (const botEav of dataEav) {
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
            }

          } catch (error) {
            isAbnormal = error;
          }
        
        if (isAbnormal) {
            return isAbnormal;
        }
        return "SUCCESS";
    }
}