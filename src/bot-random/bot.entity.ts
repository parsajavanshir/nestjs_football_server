import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {BotEavAttributeValue} from "./bot.eav.attribute.value";

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
}
