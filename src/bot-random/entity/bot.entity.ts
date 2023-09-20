import { Entity, Column, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn } from 'typeorm';
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

  @Column({ default: 0 })
  is_locking: number;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;

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
