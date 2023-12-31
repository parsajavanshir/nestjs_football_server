import { Injectable } from '@nestjs/common';
import { DataSource, Repository, IsNull, Not } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { BotRandomEntity } from '../entity/bot.entity';
import { EavAttribute } from '../../eav/entity/eav.attribute';
import { BotEavAttributeValue } from '../entity/bot.eav.attribute.value';
import { EavAttributeValueDTO } from '../dto';
import { BotListEntity } from '../entity/bot.list.entity';
import { BotListItem } from '../entity/bot.list.item';

@Injectable()
export class BotResource {
    
    constructor(
        @InjectRepository(BotRandomEntity)
        private botRepository: Repository<BotRandomEntity>,
        @InjectRepository(EavAttribute)
        private eavAttributeRepository: Repository<EavAttribute>,
        @InjectRepository(BotEavAttributeValue)
        private botEavAttributeValueRepository: Repository<BotEavAttributeValue>,
        @InjectRepository(BotListEntity)
        private botListEntityRepository: Repository<BotListEntity>,
        @InjectRepository(BotListItem)
        private botListItemRepository: Repository<BotListItem>,
        @InjectDataSource() private dataSource: DataSource,
    ) {}

    async insertMatchForBotList(botId: number, matchForBotList: Array<any>) : Promise<any>
    {
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
        // lets now open a new transaction:
        await queryRunner.startTransaction()
        try {
            for (const index in matchForBotList) {
              let newList = await this.botListEntityRepository.save({bot_id: botId});
              let listId = newList.list_id;
              for (const idx in matchForBotList[index]) {
                await this.botListItemRepository.save(
                  {
                    match_id: matchForBotList[index][idx]["entity_id"],
                    list_id: listId
                  }
                )
              }
            }
            await queryRunner.commitTransaction()
          } catch (error) {
            // since we have errors let's rollback changes we made
            await queryRunner.rollbackTransaction()
          } finally {
              // you need to release query runner which is manually created:
              await queryRunner.release()
          }
    }

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
            const botData = await this.botRepository.count();
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

    async resetCrawledToday() : Promise<any>
    {
        try {
            await this.dataSource
                .createQueryBuilder(BotRandomEntity, "botRandom")
                .update()
                .set({ crawled_today: 0})
                .execute();
            return true;
          } catch (error) {
            return false;
          }
    }

    async unstuckBotLocking() : Promise<any>
    {
        try {
          let next1h = new Date(Math.abs(+new Date() + 3600000));
          let data = await this.botRepository.createQueryBuilder('bot')
                    .where('bot.updated_at > :start_at', { start_at: next1h })
                    .andWhere('is_locking = 1')
                    .getMany();

          if (data.length > 0) {
            let botIds = [];
            data.forEach( bot => {
              botIds.push(bot["entity_id"]);
            })
            await this.dataSource
                .createQueryBuilder(BotRandomEntity, "botRandom")
                .update()
                .set({ is_locking: 0})
                .execute();
          }
          return true;
          } catch (error) {
            return false;
          }
    }

    async lockBotDataInQueue(botIds: Array <any>) : Promise<any>
    {
        try {
          await this.dataSource
              .createQueryBuilder(BotRandomEntity, "botRandom")
              .update()
              .set({ is_locking: 1})
              .where("entity_id IN (:...values)", { values: botIds})
              .execute();
            return true;
          } catch (error) {
            return false;
          }
    }

    async unlockBotDataInQueue(botIds: Array <any>) : Promise<any>
    {
        try {
          await this.dataSource
              .createQueryBuilder(BotRandomEntity, "botRandom")
              .update()
              .set({ is_locking: 0})
              .where("entity_id IN (:...values)", { values: botIds})
              .execute();
            return true;
          } catch (error) {
            return false;
          }
    }

    async getBotUIData() : Promise<any>
    {
        try {
          let UIData = await this.botRepository.find({
              select: {
                entity_id: true,
                name: true,
                botEavValues: {
                  value_id: true,
                  value: true,
                },
                botList: {
                  list_id: true,
                  status: true,
                  items: {
                    item_id: true,
                    match: {
                      entity_id: true,
                      datetime: true,
                      result: true,
                      home_name: true,
                      away_name: true,
                      home_position: true,
                      away_position: true,
                      odd: true,
                      over_under: true,
                      matchResult: {
                        entity_id: true,
                        home_result: true,
                        away_result: true,
                        home_corner: true,
                        away_corner: true,
                      }
                    } 
                  }
                }
              },
              relations: {
                  botEavValues: true,
                  botList: {
                    items: {
                      match: {
                        league: true,
                        matchResult: true
                      }
                    }
                  }
              },
              where: {
                  botList: {
                    list_id: Not(IsNull())
                  }
              },
              take: 10,
              skip: 0,
          });
            return UIData;
          } catch (error) {
            return false;
          }
    }

    async getBotListStatus(botIds) : Promise<any>
    {
        try {
          let botDataStatus = {};
          let win = await this.dataSource
              .createQueryBuilder(BotListEntity, "botList")
              .select(['bot_id'])
              .addSelect("COUNT(status) AS status_count")
              .where("status = 1")
              .andWhere("bot_id IN (:...values)", { values: botIds})
              .groupBy('bot_id, status')
              .getRawMany();
          if (win.length > 0) {
            win.forEach( item => {
              botDataStatus[item.bot_id] = {};
              botDataStatus[item.bot_id]['win'] = item.status_count;
            })
          }
          let lose = await this.dataSource
              .createQueryBuilder(BotListEntity, "botList")
              .select(['bot_id'])
              .addSelect("COUNT(status) AS status_count")
              .where("status = 0")
              .andWhere("bot_id IN (:...values)", { values: botIds})
              .groupBy('bot_id, status')
              .getRawMany();
          if (lose.length > 0) {
            lose.forEach( item => {
              if (botDataStatus.hasOwnProperty(item.bot_id)) {
                botDataStatus[item.bot_id]['lose'] = item.status_count;
              } else {
                botDataStatus[item.bot_id] = {};
              botDataStatus[item.bot_id]['lose'] = item.status_count;
              }
            })
          }
          return botDataStatus;
          } catch (error) {
            return false;
          }
    }
}
