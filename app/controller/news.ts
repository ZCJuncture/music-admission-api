import { Controller } from 'egg';

export default class NewsController extends Controller {
  public async getList() {
    const { ctx } = this;
    const { keyword } = ctx.query;
    const { skip, limit } = ctx.pagination;

    const useCache = (keyword === '' && skip === 0 && limit === ctx.app.config.pageSize);

    if (useCache) {
      const topNews = await ctx.app.redis.get('topNews');
      if (topNews) {
        ctx.body = JSON.parse(topNews);
        return;
      }
    }

    const list = await ctx.model.News.find({ title: new RegExp(keyword) })
      .sort({ createDate: -1 }).skip(skip).limit(limit);
    const total = await ctx.model.News.find().countDocuments();
    ctx.body = { list, total };

    if (useCache) {
      ctx.app.redis.set('topNews', JSON.stringify({ list, total }));
    }
  }

  public async insert() {
    const { ctx } = this;

    ctx.app.redis.del('topNews');

    const news = new ctx.model.News();
    news.title = '另一条新闻';
    news.publisher = 'admin';
    news.content = new Date().toString();
    await news.save();

    ctx.status = 200;
  }
}
