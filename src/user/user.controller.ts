import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDTO, GetUserIdByUidDTO } from './dto';
import { RealIP } from 'nestjs-real-ip';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userSerivce: UsersService) {}

  @Post('check-register')
  async checkUserByEmail(@Body() checkRegisterUserDTO: UserDTO, @RealIP() ip: string) {
    // block request if query many time by IP
    // return await this.userSerivce.checkUserByEmail(checkRegisterUserDTO);
  }

  @Post('get-user-id')
  getUserIdByUid(@Body() getUserIdByUidDTO: GetUserIdByUidDTO) {
    return this.userSerivce.findUserIdByUid(getUserIdByUidDTO);
  }
}
