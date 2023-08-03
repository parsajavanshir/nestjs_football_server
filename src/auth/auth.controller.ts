import { Body, Controller, Post, Get, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/user/dto';
import { AuthGuard } from './auth.guard';
import { TokenDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard)
    @Post('login')
    signIn(@Body() userDTO: UserDTO) {
        return this.authService.signIn(userDTO);
    }

    @Post('check-user-token')
    checkUserToken(@Body() token: TokenDTO) {
        return this.authService.checkUserToken(token);
    }
}
