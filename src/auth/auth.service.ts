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
        const user = await this.usersService.checkUserByEmail(userDTO);
        this.firebaseApp.getAuth().verifyIdToken(userDTO.accessToken)
        .then((decodedToken) => {
          console.log('====================================');
          console.log(decodedToken);
          console.log('====================================');
        }).catch((error) => {
          console.log('====================================');
          console.log("ERRORR");
          console.log('====================================');
        });
        if (!user) {
            return false;
        }
        // // if (user?.password !== pass) {
        // //   throw new UnauthorizedException();
        // // }
        const payload = { sub: user.entity_id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
