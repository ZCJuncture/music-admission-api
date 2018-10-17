import { Context } from 'egg';
import * as jwt from 'jsonwebtoken';

export default function (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const tokenFromClient: string = ctx.header.token;

    if (tokenFromClient === '') {
      ctx.status = 403;
      ctx.body = 'token needed';
      return;
    }

    const { phoneNumber } = jwt.decode(tokenFromClient);
    const tokenFromRedis: string = await ctx.app.redis.get(phoneNumber);

    if (tokenFromClient !== tokenFromRedis) {
      ctx.status = 403;
      ctx.body = 'token expired';
      return;
    }

    ctx.phoneNumber = phoneNumber;
    await next();
  };
}
