import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EavAttributeType } from './eav.attribute.type';

@Entity()

export class EavAttribute {
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column()
  type_id: number;

  @Column({ unique: true })
  attribute_code: string;

  @Column()
  attribute_label: string;

  @Column()
  type_input: string;

  @ManyToOne(() => EavAttributeType, (EavAttributeType) => EavAttributeType.eavAttrs, { cascade: true })
  @JoinColumn([{ name: 'type_id', referencedColumnName: 'type_id' }])
  eavTypes: EavAttributeType;
}
