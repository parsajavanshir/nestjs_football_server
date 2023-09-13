import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique, Index} from 'typeorm';
import { BotRandomEntity } from "./bot.entity";
import { NewMatchEntity } from 'src/match/entity/new.match.entity';


@Entity()
@Unique(['match_id', 'bot_id'])
export class BotMatchItem {
    @PrimaryGeneratedColumn()
    item_id: number;

    @Column()
    @Index()
    match_id: number;

    @Column()
    @Index()
    bot_id: number;

    @ManyToOne(() => BotRandomEntity, (BotRandomEntity) => BotRandomEntity.botMatchItem, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'bot_id', referencedColumnName: 'entity_id' }])
    bot: BotRandomEntity;
    @ManyToOne(() => NewMatchEntity, (NewMatchEntity) => NewMatchEntity.botMatchItem, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'match_id', referencedColumnName: 'entity_id' }])
    match: NewMatchEntity;
}
