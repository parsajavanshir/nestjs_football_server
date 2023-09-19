import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Index,
} from 'typeorm';
import { NewMatchEntity } from '../../match/entity/new.match.entity';
import { BotListEntity } from './bot.list.entity';

@Entity()
@Unique(['match_id', 'list_id'])
export class BotListItem {
  @PrimaryGeneratedColumn()
  item_id: number;

  @Column()
  @Index()
  match_id: number;

  @Column()
  @Index()
  list_id: number;

  @ManyToOne(() => BotListEntity, (BotListEntity) => BotListEntity.items, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'list_id', referencedColumnName: 'list_id' }])
  botList: BotListEntity;

  @ManyToOne(() => NewMatchEntity, (NewMatchEntity) => NewMatchEntity.BotListItem, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'match_id', referencedColumnName: 'entity_id' }])
  match: NewMatchEntity;
}
