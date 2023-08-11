import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import {NewMatchEntity} from "../match/entity/new.match.entity";

@Entity()
export class LeagueEntity {
    @PrimaryGeneratedColumn()
    entity_id: number;

    @Column({ unique: true })
    name: number;

    @OneToMany(
        () => NewMatchEntity,
        (NewMatchEntity) => NewMatchEntity.league,
        { onDelete: 'CASCADE' },
    )
    newMatches: NewMatchEntity[];
}
