import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {BotRandomEntity} from "./bot.entity";

@Injectable()
export class BotService {
    odd_range = 8;
    over_range = 8;
    under_range = 8;
    all_odd = true;
    league_name = [];
    position_range = {
        from: 1,
        to: 10
    };


    constructor(
        @InjectRepository(BotRandomEntity)
        private starMatchRepository: Repository<BotRandomEntity>,
    ) {}

    // save star match
    async saveMatchForUser(): Promise<true | false> {

    }
}
