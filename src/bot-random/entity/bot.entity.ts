import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BotEavAttributeValue } from './bot.eav.attribute.value';
import { BotListItem } from './bot.list.item';
import { BotListEntity } from './bot.list.entity';

@Entity()
export class BotRandomEntity {
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: 0 })
  crawled_today: number;

  @OneToMany(
    () => BotEavAttributeValue,
    (BotEavAttributeValue) => BotEavAttributeValue.bot,
    { onDelete: 'CASCADE' },
  )
  botEavValues: BotEavAttributeValue[];

  @OneToMany(() => BotListEntity, (BotListEntity) => BotListEntity.bot, {
    onDelete: 'CASCADE',
  })
  botList: BotListEntity[];
}
