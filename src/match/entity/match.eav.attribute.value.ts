import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique, Index} from 'typeorm';
import {NewMatchEntity} from "./new.match.entity";
import {EavAttribute} from "../../eav/entity/eav.attribute";

@Entity()
@Unique(['entity_id', 'attribute_id'])
export class MatchEavAttributeValue {
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

    @ManyToOne(() => NewMatchEntity, (NewMatchEntity) => NewMatchEntity.botEavValues, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'entity_id', referencedColumnName: 'entity_id' }])
    bot: NewMatchEntity;
    @ManyToOne(() => EavAttribute, (EavAttribute) => EavAttribute.matchEavValues, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'attribute_id', referencedColumnName: 'attribute_id' }])
    eav: EavAttribute;
}
