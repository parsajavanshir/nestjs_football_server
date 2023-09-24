import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

@Entity()
export class MatchLiveContent {
    @PrimaryGeneratedColumn()
    entity_id: number;

    @Column({type: 'mediumtext', nullable: true })
    content: string;

    @Column({type: 'mediumtext', nullable: true })
    match_data_json: string;
}
