import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique, Index} from 'typeorm';
import {BotRandomEntity} from "./bot.entity";
import {BotEavAttribute} from "./bot.eav.attribute";

@Entity()
@Unique(['bot_id', 'attribute_id'])
export class BotEavAttributeValue {
    @PrimaryGeneratedColumn()
    value_id: number;

    @Column()
    @Index()
    attribute_id: number;

    @Column()
    @Index()
    bot_id: number;

    @Column({type: 'text' })
    value: string;

    @ManyToOne(() => BotRandomEntity, (BotRandomEntity) => BotRandomEntity.botEavValues, { cascade: true })
    @JoinColumn([{ name: 'bot_id', referencedColumnName: 'entity_id' }])
    bot: BotRandomEntity;
    @ManyToOne(() => BotEavAttribute, (BotEavAttribute) => BotEavAttribute.botEavValues, { cascade: true })
    @JoinColumn([{ name: 'attribute_id', referencedColumnName: 'attribute_id' }])
    botEav: BotEavAttribute;
}
