import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class BotRandomEntity {
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column({ unique: true })
  name: string;
}
