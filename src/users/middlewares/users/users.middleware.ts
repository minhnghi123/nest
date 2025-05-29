import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Req,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let { authorization } = req.headers;
    authorization = authorization?.split(' ')[1] || '';
    if (!authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    req['user'] = authorization;
    console.log('Bearer Token: ', authorization);
    next();
  }
}
