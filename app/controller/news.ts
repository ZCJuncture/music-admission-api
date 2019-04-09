import { Controller } from 'egg';

export default class NewsController extends Controller {
  public async getNewsList() {
    const { ctx } = this;
    const { keyword } = ctx.query;
    const { skip, limit } = ctx.pagination;

    const useCache = (!keyword && skip === 0 && limit === ctx.app.config.pageSize);

    if (useCache) {
      const topNews = await ctx.app.redis.get('topNews');
      if (topNews) {
        ctx.body = JSON.parse(topNews);
        return;
      }
    }

    const condition = keyword ? { title: new RegExp(keyword) } : {};
    const list = await ctx.model.News.find(condition)
      .sort({ createDate: -1 }).skip(skip).limit(limit).read('secondary');
    const total = await ctx.model.News.find(condition).countDocuments().read('secondary');

    if (useCache) {
      ctx.app.redis.set('topNews', JSON.stringify({ list, total }));
    }

    ctx.body = { list, total };
  }
}
