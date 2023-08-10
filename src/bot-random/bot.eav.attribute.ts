import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {BotEavAttributeValue} from "./bot.eav.attribute.value";

@Entity()

export class BotEavAttribute {
    @PrimaryGeneratedColumn()
    attribute_id: number;

    @Column({ unique: true })
    attribute_code: string;

    @Column()
    frontend_label: string;

    @Column()
    type_input: string;

    @OneToMany(
        () => BotEavAttributeValue,
        (BotEavAttributeValue) => BotEavAttributeValue.botEav,
        { onDelete: 'CASCADE' },
    )
    botEavValues: BotEavAttributeValue[];
}
