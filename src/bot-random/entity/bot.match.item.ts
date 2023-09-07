import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique, Index} from 'typeorm';
import { BotRandomEntity } from "./bot.entity";
import { EavAttribute } from "../../eav/entity/eav.attribute";


@Entity()
@Unique(['entity_id', 'attribute_id'])
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
    @ManyToOne(() => EavAttribute, (EavAttribute) => EavAttribute.botEavValues, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'attribute_id', referencedColumnName: 'attribute_id' }])
    eav: EavAttribute;
}
