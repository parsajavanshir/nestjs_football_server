import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDTO } from './dto';

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
  async checkUserByEmail(@Body() checkRegisterUserDTO: UserDTO) {
    return await this.userSerivce.checkUserByEmail(checkRegisterUserDTO);
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
