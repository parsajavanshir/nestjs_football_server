import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';
  
@Entity()
export class CrawlLiveContent {
    @PrimaryGeneratedColumn()
    entity_id: number;
  
    @Column('mediumtext')
    content: number;
  
    @Column('mediumtext')
    match_data_json: string;
}
  