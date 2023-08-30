import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BotRandomEntity } from '../entity/bot.entity';
import { EavAttribute } from 'src/eav/entity/eav.attribute';

@Injectable()
export class BotResource {
    
    constructor(
        @InjectRepository(BotRandomEntity)
        private bothRepository: Repository<BotRandomEntity>,
        @InjectRepository(EavAttribute)
        private eavAttributeRepository: Repository<EavAttribute>,
    ) {}

    async getMaxBotId() : Promise<any>
    {
        try {
            const [botData] = await this.bothRepository.find({
                order: {
                    entity_id: 'DESC',
                },
                take: 1,
            });
            if (!botData) {
              return 1;
            }
            return botData.entity_id + 1;
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