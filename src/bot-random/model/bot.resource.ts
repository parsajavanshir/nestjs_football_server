import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BotRandomEntity } from '../entity/bot.entity';
import { EavAttribute } from 'src/eav/entity/eav.attribute';
import { BotEavAttributeValue } from '../entity/bot.eav.attribute.value';
import { EavAttributeValueDTO } from '../dto';

@Injectable()
export class BotResource {
    
    constructor(
        @InjectRepository(BotRandomEntity)
        private bothRepository: Repository<BotRandomEntity>,
        @InjectRepository(EavAttribute)
        private eavAttributeRepository: Repository<EavAttribute>,
        @InjectRepository(BotEavAttributeValue)
        private botEavAttributeValueRepository: Repository<BotEavAttributeValue>,
    ) {}

    async saveNewBotEavValueRecord(eavAttributeValueDTO: EavAttributeValueDTO) : Promise<any>
    {
        try {
            const attributeValueEntity = await this.botEavAttributeValueRepository.save(eavAttributeValueDTO);
            return attributeValueEntity;
          } catch (error) {
            return false;
          }
    }

    async findBotEavValueRecord(bot_id, attribute_id) : Promise<any>
    {
        try {
            const attributeValueEntity = await this.botEavAttributeValueRepository.findOne({
                where: {
                  attribute_id: attribute_id,
                  entity_id: bot_id,
                },
            })
            if (!attributeValueEntity) {
              return false;
            }
            return attributeValueEntity.value_id;
          } catch (error) {
            return false;
          }
    }

    async getMaxBotId() : Promise<any>
    {
        try {
            const botData = await this.bothRepository.count();
            console.log('========================botData============');
            console.log(botData);
            console.log('========================botData============');
            if (!botData) {
              return 1;
            }
            return botData + 1;
          } catch (error) {
            return false;
          }
    }

    async findEavIdByCode(attributeCode) : Promise<any>
    {
        try {
            const attributeEntity = await this.eavAttributeRepository.findOne({
                where: {
                  attribute_code: attributeCode,
                },
            })
            if (!attributeEntity) {
              return false;
            }
            return attributeEntity.attribute_id;
          } catch (error) {
            return false;
          }
    }
}