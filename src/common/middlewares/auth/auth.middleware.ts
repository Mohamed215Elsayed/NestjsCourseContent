import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // constructor(private authService: AuthService) {}
  use(req: any, res: any, next: () => void) {
   /*  const isAuth = this.authService.validate(req);
    if (!isAuth) {
      throw new UnauthorizedException();
    } */
    next();
  }
}
