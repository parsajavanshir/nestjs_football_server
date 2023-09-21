import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { BotRandomEntity } from './bot.entity';
import { BotListItem } from './bot.list.item';

@Entity()
export class BotListEntity {
  @PrimaryGeneratedColumn()
  list_id: number;

  @Column()
  @Index()
  bot_id: number;

  @Column({nullable: true})
  status: number;

  @ManyToOne(
    () => BotRandomEntity,
    (BotRandomEntity) => BotRandomEntity.botList,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn([{ name: 'bot_id', referencedColumnName: 'entity_id' }])
  bot: BotRandomEntity;

  @OneToMany(() => BotListItem, (BotListItem) => BotListItem.botList, {
    onDelete: 'CASCADE',
  })
  items: BotListItem[];
}
