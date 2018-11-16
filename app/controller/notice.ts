import { Controller } from 'egg';

export default class NoticeController extends Controller {
  public async getNoticeList() {
    const { ctx } = this;
    const { userId } = ctx;
    const { keyword } = ctx.query;
    const { skip, limit } = ctx.pagination;

    const condition = keyword ? { userId, content: new RegExp(keyword) } : { userId };
    const list = await ctx.model.Notice.find(condition).sort({ createDate: -1 }).skip(skip).limit(limit);
    const total = await ctx.model.Notice.find(condition).countDocuments();

    ctx.body = { list, total };
  }
}
