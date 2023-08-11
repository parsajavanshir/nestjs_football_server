import { Injectable } from '@nestjs/common';
import { SaveStarMatchForUserDTO, GetStarMatchForUserDTO, GetUserIdByEmailDTO } from './dto';
import { StarMatch } from './entity/star.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {UsersService} from "../user/users.service";

@Injectable()
export class StarService {
    constructor(
        private usersService: UsersService,
        @InjectRepository(StarMatch)
        private starMatchRepository: Repository<StarMatch>,
      ) {}

    // save star match
    async saveMatchForUser(starMatchForUserDTO: SaveStarMatchForUserDTO): Promise<true | false> {
      try {
        let starMatch = await this.getStarMatchByUser({user_id: starMatchForUserDTO.user_id});
        starMatchForUserDTO.match_id = JSON.stringify(starMatchForUserDTO.match_id);
        if (!starMatch) {
          await this.starMatchRepository.save(starMatchForUserDTO);
        } else {
          let starId = starMatch.entity_id;
          await this.starMatchRepository.update(starId, starMatchForUserDTO);
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    async getStarMatchByUser(getStarMatchForUserDTO: GetStarMatchForUserDTO): Promise<StarMatch | false> {
        try {
            let userId = getStarMatchForUserDTO.user_id;
            let starMatch = await this.starMatchRepository.findOne({
                where: {
                    user_id: userId,
                },
            });

            if (!starMatch || !starMatch.hasOwnProperty("match_id")) {
                return false;
            }

            //F3 ticket check can Json or not
            if (!Array.isArray(JSON.parse(starMatch.match_id))) {
              await this.starMatchRepository.delete(starMatch.entity_id);
              return false;
            }

            return starMatch;
    
        } catch (error) {
          // console.log(error);
          return false;
        }
    }
}
