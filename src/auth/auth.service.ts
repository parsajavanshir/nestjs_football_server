import { FirebaseApp } from './../firebase/firebase.app';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/user/dto';
import { TokenDTO } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private firebaseApp: FirebaseApp
    ) {}

    async signIn(userDTO: UserDTO) {
      try {
        let validUserData = await this.checkUserTokenByDTO(userDTO);
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

    async checkUserTokenByDTO(userDTO: UserDTO) {
      try {
        let validUserData = true;
        await this.firebaseApp.getAuth().verifyIdToken(userDTO.accessToken)
        .then((decodedToken) => {
          // console.log('====================================');
          // console.log(decodedToken);
          // console.log('====================================');
          if (userDTO.email != decodedToken.email) {
            validUserData = false;
          }
        }).catch((error) => {
          // console.log(error);
          validUserData = false;
        });
  
        return validUserData;
      } catch (error) {
        // console.log(error);
        return false;
      }
    }

    async checkUserToken(token: TokenDTO) {
      if (!token.accessToken) {
        return false;
      }
      let validUserData = true;
      try {
        await this.firebaseApp.getAuth().verifyIdToken(token.accessToken)
        .then((decodedToken) => {

        }).catch((error) => {
          // console.log(error);
          validUserData = false;
        });
  
      } catch (error) {
        // console.log(error);
        return false;
      }
      return validUserData;
    }
}
