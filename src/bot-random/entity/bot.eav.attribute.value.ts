import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique, Index} from 'typeorm';
import { BotRandomEntity } from "./bot.entity";
import { EavAttribute } from "../../eav/entity/eav.attribute";


@Entity()
@Unique(['entity_id', 'attribute_id'])
export class BotEavAttributeValue {
    @PrimaryGeneratedColumn()
    value_id: number;

    @Column()
    @Index()
    attribute_id: number;

    @Column()
    @Index()
    entity_id: number;

    @Column({type: 'text' })
    value: string;

    @ManyToOne(() => BotRandomEntity, (BotRandomEntity) => BotRandomEntity.botEavValues, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'entity_id', referencedColumnName: 'entity_id' }])
    bot: BotRandomEntity;
    @ManyToOne(() => EavAttribute, (EavAttribute) => EavAttribute.botEavValues, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'attribute_id', referencedColumnName: 'attribute_id' }])
    eav: EavAttribute;
}
