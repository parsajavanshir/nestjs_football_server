import { Body, Controller, Post, Get, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/user/dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() userDTO: UserDTO) {
        return this.authService.signIn(userDTO);
    }

    @Post('check-user-token')
    checkUserToken() {
        return this.authService.checkUserToken();
    }
}
