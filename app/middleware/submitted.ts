import { Context } from 'egg';

export default function (demand: boolean): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const { userId } = ctx;
    const { submitted } = await ctx.model.User.findById(userId).select({ submitted: 1 });

    if (submitted !== demand) {
      ctx.status = 401;
      ctx.body = 'submitted is not demanded';
      return;
    }

    await next();
  };
}
