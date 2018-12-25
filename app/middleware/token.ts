import { Context } from 'egg';
import * as jwt from 'jsonwebtoken';

export default function (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const token = ctx.header.token || ctx.query.token;

    if (!token || token === '') {
      ctx.status = 403;
      ctx.body = 'token needed';
      return;
    }

    try {
      const { userId } = jwt.verify(token, (ctx.app as any).tokenKey);
      ctx.userId = userId;

    } catch (e) {
      ctx.status = 403;
      ctx.body = 'token expired';
      return;
    }

    await next();
  };
}
