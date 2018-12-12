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

    const { userId } = jwt.verify(tokenFromClient, 'music-admission');
    const tokenFromRedis = await ctx.app.redis.get('token_' + userId);

    if (tokenFromClient !== tokenFromRedis) {
      ctx.app.redis.hdel('token', userId);
      ctx.status = 403;
      ctx.body = 'token expired';
      return;
    }

    ctx.userId = userId;
    await next();
  };
}
