import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    OneToMany,
    JoinColumn,
    OneToOne
} from 'typeorm';
import {LeagueEntity} from "../../league/league.entity";
import { NewMatchEntity } from './new.match.entity';

@Entity()
@Unique(['home_name', 'away_name', 'date'])
export class MatchResult {
    @PrimaryGeneratedColumn()
    entity_id: number;

    @Column({nullable: true})
    league_id: number;

    @Column({type: 'datetime'})
    datetime: string;

    @Column()
    date: string;

    @Column()
    home_name: string;

    @Column()
    away_name: string;

    @Column()
    home_result: string;

    @Column()
    away_result: string;

    @Column({nullable: true})
    home_corner: string;

    @Column({nullable: true})
    away_corner: string;

    @Column({nullable: true})
    match_id: number;

    // @ManyToOne(() => LeagueEntity, (LeagueEntity) => LeagueEntity.newMatches, { onDelete: 'CASCADE' })
    // @JoinColumn([{ name: 'league_id', referencedColumnName: 'entity_id' }])
    // league: LeagueEntity;
    @OneToOne(() => NewMatchEntity, (NewMatchEntity) => NewMatchEntity.matchResult, {},)
    @JoinColumn([{ name: 'match_id', referencedColumnName: 'entity_id' }])
    matchEntity: NewMatchEntity
}
