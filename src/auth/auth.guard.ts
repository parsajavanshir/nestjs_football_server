import {
  Injectable, NestMiddleware
} from '@nestjs/common';
import { FirebaseApp } from '../firebase/firebase.app';
import { Request, Response } from 'express';

  @Injectable()
  export class AuthGuard implements NestMiddleware {
    constructor(
      private firebaseApp: FirebaseApp
      ) {}

    use(req: Request, res: Response, next: () => void) {
      let token = req.headers.authorization;
      token = token.replace('Bearer ', '');
      console.log(token)
      if (token != null && token != '') {
        let validToken = true;
        try {
          this.firebaseApp.getAuth().verifyIdToken(token)
              .then(async (decodedToken) => {
                if (!decodedToken.email) {
                  validToken = false;
                }
                next();
              }).catch((error) => {
                // if (error.code == 'auth/id-token-expired') {
                //   throw new UnauthorizedException("auth/id-token-expired");
                // }
                AuthGuard.accessDenied(res);
              });
        } catch (error) {
          AuthGuard.accessDenied(res);
        }
      } else {
        AuthGuard.accessDenied(res);
      }
    }

    private static accessDenied(res: Response) {
      res.status(403).json(false);
    }
  }