import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import {LeagueEntity} from "../../league/league.entity";
import {BotEavAttributeValue} from "../../bot-random/entity/bot.eav.attribute.value";
import {MatchEavAttributeValue} from "./match.eav.attribute.value";

@Entity()

export class NewMatchEntity {
    @PrimaryGeneratedColumn()
    entity_id: number;

    @Column()
    league_id: number;

    @Column({type: 'datetime'})
    datetime: string;

    @Column()
    home_name: string;

    @Column()
    away_name: string;

    @Column()
    home_position: number;

    @Column()
    away_position: number;

    @Column()
    odd: string;

    @Column()
    home_odd: string;

    @Column()
    away_odd: string;

    @Column()
    over_under: string;

    @Column()
    home_over_under: string;

    @Column()
    away_over_under: string;

    @ManyToOne(() => LeagueEntity, (LeagueEntity) => LeagueEntity.newMatches, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'league_id', referencedColumnName: 'entity_id' }])
    league: LeagueEntity;

    @OneToMany(
        () => MatchEavAttributeValue,
        (MatchEavAttributeValue) => MatchEavAttributeValue.eav,
        { onDelete: 'CASCADE' },
    )
    botEavValues: BotEavAttributeValue[];
}
