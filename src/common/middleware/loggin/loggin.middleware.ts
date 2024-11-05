import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogginMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-Response time');
    console.log('Hi, i am a middleware');

    res.on('finish', () => console.timeEnd('Request-Response time'));
    next();
  }
}
