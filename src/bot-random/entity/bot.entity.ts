import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {BotEavAttributeValue} from "./bot.eav.attribute.value";
import { BotMatchItem } from './bot.match.item';

@Entity()

export class BotRandomEntity {
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(
      () => BotEavAttributeValue,
      (BotEavAttributeValue) => BotEavAttributeValue.bot,
      { onDelete: 'CASCADE' },
  )
  botEavValues: BotEavAttributeValue[];
  @OneToMany(
    () => BotMatchItem,
    (BotMatchItem) => BotMatchItem.bot,
    { onDelete: 'CASCADE' },
  )
  botMatchItem: BotMatchItem[];
}
