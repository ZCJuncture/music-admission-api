import { Context } from 'egg';
import * as jwt from 'jsonwebtoken';

export default function (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const tokenFromClient = ctx.header.token || ctx.query.token;

    if (!tokenFromClient || tokenFromClient === '') {
      ctx.status = 403;
      ctx.body = 'token needed';
      return;
    }

    const { phoneNumber } = jwt.decode(tokenFromClient);
    const tokenFromRedis = await ctx.app.redis.hget('token', phoneNumber);

    if (tokenFromClient !== tokenFromRedis) {
      ctx.app.redis.hdel('token', phoneNumber);
      ctx.status = 403;
      ctx.body = 'token expired';
      return;
    }

    ctx.phoneNumber = phoneNumber;
    await next();
  };
}
