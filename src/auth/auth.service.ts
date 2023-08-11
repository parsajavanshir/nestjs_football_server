import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UsersService} from "../user/users.service";
import {UserDTO} from "../user/dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(userDTO: UserDTO) {
      try {
        const user = await this.usersService.checkUserByEmail(userDTO);
        const payload = { sub: user.entity_id, email: user.email };
        return {
          user_id: user.entity_id,
          access_token: await this.jwtService.signAsync(payload),
        };
      } catch (error) {
        // console.log(error);
        return false;
      }
    }

    async checkUserToken() {
      return true;
    }
}
