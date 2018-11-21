import { Controller } from 'egg';
import * as path from 'path';

export default class InitController extends Controller {
  public async init() {
    const { ctx } = this;

    await ctx.app.redis.del('topNews');

    const news = require(path.join(this.config.baseDir, 'files/news.json'));
    await ctx.model.News.insertMany(news);

    // const majors = require(path.join(this.config.baseDir, 'files/major.json'));
    // await ctx.model.Major.insertMany(majors);

    // const examInfo = ['作曲', '指挥', '音乐教育'].map((major) => {
    //   return {
    //     _id: major,
    //     data: require(path.join(this.config.baseDir, `files/${major}.json`)),
    //   };
    // });
    // await ctx.model.ExamInfo.insertMany(examInfo);

    // const payItem = new ctx.model.PayItem();
    // payItem.name = '初试收费';
    // payItem.stage = '初试';
    // payItem.amount = 100.00;
    // payItem.enabled = true;
    // await payItem.save();

    // const payItem2 = new ctx.model.PayItem();
    // payItem2.name = '复试收费';
    // payItem2.stage = '复试';
    // payItem2.amount = 200.00;
    // payItem2.enabled = true;
    // await payItem2.save();

    ctx.status = 200;
  }
}
