import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique, Index } from 'typeorm';
import { StarMatch } from '../match/star.entity';

@Entity()
@Unique(['email'])

export class UserEntity {
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ default: true })
  is_active: boolean;

  @Column('text')
  photoURL: string;

  @Column({type: 'text', nullable: true })
  token: string;
  
  @Index()
  @Column()
  uid: string;

  @Column({ default: () => 'NOW()' })
  created_at: Date;

  @Column('timestamp', {
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updated_at: Date;

  @OneToMany(
    () => StarMatch,
    (star) => star.users, //optional
    { onDelete: 'CASCADE' },
  )
  stars: StarMatch[];
  user_id: any;
}
