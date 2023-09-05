import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique, OneToMany} from 'typeorm';
import { EavAttributeType } from './eav.attribute.type';
import { MatchEavAttributeValue } from "../../match/entity/match.eav.attribute.value";
import {BotEavAttributeValue} from "../../bot-random/entity/bot.eav.attribute.value";

@Entity()
@Unique(['type_id', 'attribute_code'])
export class EavAttribute {
  @PrimaryGeneratedColumn()
  attribute_id: number;

  @Column()
  type_id: number;

  @Column()
  attribute_code: string;

  @Column()
  attribute_label: string;

  @Column()
  type_input: string;

  @ManyToOne(() => EavAttributeType, (EavAttributeType) => EavAttributeType.eavAttrs, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'entity_type_id' }])
  eavType: EavAttributeType;

  @OneToMany(
    () => BotEavAttributeValue,
    (BotEavAttributeValue) => BotEavAttributeValue.eav,
    { onDelete: 'CASCADE' },
  )
  botEavValues: BotEavAttributeValue[];

  @OneToMany(
      () => MatchEavAttributeValue,
      (MatchEavAttributeValue) => MatchEavAttributeValue.eav,
      { onDelete: 'CASCADE' },
  )
  matchEavValues: MatchEavAttributeValue[];
}
