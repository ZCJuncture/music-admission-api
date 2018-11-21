import { Context } from 'egg';

export default function (min: number, max: number): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { userId } = ctx;
    const { status } = await ctx.model.User.findById(userId).select({ status: 1 });

    if (status < min || status > max) {
      ctx.status = 401;
      ctx.body = 'status error';
      return;
    }

    await next();
  };
}
