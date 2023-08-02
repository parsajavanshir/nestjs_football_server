import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { FirebaseApp } from './../firebase/firebase.app';
  import { jwtConstants } from './constants';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private firebaseApp: FirebaseApp
      ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      let validToken = true;
      try {
        await this.firebaseApp.getAuth().verifyIdToken(token)
        .then((decodedToken) => {
          if (!decodedToken.email) {
            validToken = false;
          }
        }).catch((error) => {
          if (error.code == 'auth/id-token-expired') {
            throw new UnauthorizedException("auth/id-token-expired");
          }
        });
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }

      if (!validToken) {
        throw new UnauthorizedException();
      }

      return validToken;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }