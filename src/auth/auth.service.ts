import { FirebaseApp } from './../firebase/firebase.app';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private firebaseApp: FirebaseApp
    ) {}

    async signIn(userDTO: UserDTO) {
      try {
        let validUserData = true;
        await this.firebaseApp.getAuth().verifyIdToken(userDTO.accessToken)
        .then((decodedToken) => {
          if (userDTO.email != decodedToken.email) {
            validUserData = false;
          }
        }).catch((error) => {
          // console.log(error);
          return false;
        });
  
        if (!validUserData) {
          return false;
        }
        
        const user = await this.usersService.checkUserByEmail(userDTO);
        const payload = { sub: user.entity_id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      } catch (error) {
        // console.log(error);
        return false;
      }
    }
}
