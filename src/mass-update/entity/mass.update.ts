import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MassUpdate {
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column({ unique: true })
  code: string;

  @Column({ default: 0 })
  current_limit: number;
}
