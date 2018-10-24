import { Context } from 'egg';

export default function (): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const configSize = ctx.app.config.pageSize;
    let { pageNo, pageSize } = ctx.query;

    pageNo = Number.parseInt(pageNo) || 1;
    pageSize = Number.parseInt(pageSize) || configSize;

    if (pageNo <= 0) { pageNo = 1; }
    if (pageSize <= 0) { pageSize = configSize; }

    ctx.pagination = {
      skip: (pageNo - 1) * pageSize,
      limit: pageSize,
    };

    await next();
  };
}
