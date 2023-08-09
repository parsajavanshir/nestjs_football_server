import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EavAttribute } from './eav.attibute';

@Entity()

export class EavAttributeType {
  @PrimaryGeneratedColumn()
  type_id: number;

  @Column({ unique: true })
  entity_type_code: string;

  @Column({ unique: true })
  entity_table: string;

  @OneToMany(
    () => EavAttribute,
    (EavAttribute) => EavAttribute.eavTypes,
    { onDelete: 'CASCADE' },
  )
  eavAttrs: EavAttribute[];
}
