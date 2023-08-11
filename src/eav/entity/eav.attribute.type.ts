import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EavAttribute } from './eav.attribute';

@Entity()

export class EavAttributeType {
  @PrimaryGeneratedColumn()
  entity_type_id: number;

  @Column()
  entity_type_code: string;

  @Column({ unique: true })
  entity_table: string;

  @OneToMany(
    () => EavAttribute,
    (EavAttribute) => EavAttribute.eavType,
    { onDelete: 'CASCADE' },
  )
  eavAttrs: EavAttribute[];
}
