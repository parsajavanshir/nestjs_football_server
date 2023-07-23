import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity()
@Index(['user_id', 'match_id'], { unique: true })
export class StarMatch {
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column()
  @Index()
  user_id: number;

  @Column('text')
  match_id: string;

  @ManyToOne(() => UserEntity, (user) => user.stars, { cascade: true })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'entity_id' }])
  users: UserEntity;
}
