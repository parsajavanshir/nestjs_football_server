import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique} from 'typeorm';
import { EavAttributeType } from './eav.attribute.type';

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

  @ManyToOne(() => EavAttributeType, (EavAttributeType) => EavAttributeType.eavAttrs, { cascade: true })
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'entity_type_id' }])
  eavTypes: EavAttributeType;
}
