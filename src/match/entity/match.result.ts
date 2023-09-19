import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    OneToMany
} from 'typeorm';
import {LeagueEntity} from "../../league/league.entity";

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

    // @ManyToOne(() => LeagueEntity, (LeagueEntity) => LeagueEntity.newMatches, { onDelete: 'CASCADE' })
    // @JoinColumn([{ name: 'league_id', referencedColumnName: 'entity_id' }])
    // league: LeagueEntity;
}
