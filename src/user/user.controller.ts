import { Body, Controller, Delete, Get, Param, Post, Ip } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDTO, UserStarMatchDTO } from './dto';
import { RealIP } from 'nestjs-real-ip';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userSerivce: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'List all users' })
  async getUserList() {
    return await this.userSerivce.getUserList();
  }

  @Post('check-register')
  async checkUserByEmail(@Body() checkRegisterUserDTO: UserDTO, @RealIP() ip: string) {
    // block request if query many time by IP
    // console.log('====================================');
    // console.log(checkRegisterUserDTO);
    // console.log('====================================');
    return await this.userSerivce.checkUserByEmail(checkRegisterUserDTO);
  }

  @Post('get-star-match')
  async getStarMatch(@Body() userStarMatchDTO: UserStarMatchDTO) {
    return await this.userSerivce.getStarMatch(userStarMatchDTO);
  }

  @Post('login')
  login() {
    return 'login user';
  }

  @Delete(':entity_id')
  remove(@Param('entity_id') entity_id: number) {
    return this.userSerivce.remove(entity_id);
  }
}
