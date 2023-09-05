import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Unique
} from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';

@Entity()
@Unique(['user_id'])
export class StarMatch {
  @PrimaryGeneratedColumn()
  entity_id: number;

  @Column()
  user_id: number;

  @Column('text')
  match_id: string;

  @ManyToOne(() => UserEntity, (user) => user.stars, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'entity_id' }])
  users: UserEntity;
}
