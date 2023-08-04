import { Body, Controller, Post, Get, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { StarService } from './star.service';
import { SaveStarMatchForUserDTO, GetStarMatchForUserDTO } from './dto';

@Controller('star')
export class StarController {
    constructor(protected starService: StarService) {}

    @Post('save-star-match')
    saveStarMatchForUser(@Body() starMatchForUserDTO: SaveStarMatchForUserDTO) {
        return this.starService.saveMatchForUser(starMatchForUserDTO);
    }
    @Post('get-star-match')
    getStarMatchByUser(@Body() getStarMatchForUserDTO: GetStarMatchForUserDTO) {
        return this.starService.getStarMatchByUser(getStarMatchForUserDTO);
    }
}
