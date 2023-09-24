import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    Unique,
    OneToMany,
    OneToOne
} from 'typeorm';
import {LeagueEntity} from "../../league/league.entity";
import {BotEavAttributeValue} from "../../bot-random/entity/bot.eav.attribute.value";
import {MatchEavAttributeValue} from "./match.eav.attribute.value";
import { BotListItem } from '../../bot-random/entity/bot.list.item';
import { MatchResult } from './match.result';

@Entity()
@Unique(['home_name', 'away_name', 'date'])
export class NewMatchEntity {
    @PrimaryGeneratedColumn()
    entity_id: number;

    @Column({nullable: true})
    league_id: number;

    @Column({type: 'datetime'})
    datetime: string;

    @Column({nullable: true})
    date: string;

    @Column()
    result: number;

    @Column()
    home_name: string;

    @Column()
    away_name: string;

    @Column({nullable: true})
    home_position: number;

    @Column({nullable: true})
    away_position: number;

    @Column({nullable: true})
    odd: string;

    @Column({nullable: true})
    over_under: string;

    @ManyToOne(() => LeagueEntity, (LeagueEntity) => LeagueEntity.newMatches, { onDelete: 'CASCADE' })
    @JoinColumn([{ name: 'league_id', referencedColumnName: 'entity_id' }])
    league: LeagueEntity;

    @OneToMany(
        () => MatchEavAttributeValue,
        (MatchEavAttributeValue) => MatchEavAttributeValue.eav,
        { onDelete: 'CASCADE' },
    )
    botEavValues: BotEavAttributeValue[];

    @OneToOne(
        () => MatchResult,
        (MatchResult) => MatchResult.matchEntity,
        { onDelete: 'CASCADE' },
    )
    matchResult: MatchResult

    @OneToMany(
        () => BotListItem,
        (BotListItem) => BotListItem.match,
        { onDelete: 'CASCADE' },
      )
      BotListItem: BotListItem[];
}
