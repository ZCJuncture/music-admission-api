import { Service } from 'egg';

export default class NoticeService extends Service {
  public async autoSend(content: string) {
    const { ctx } = this;
    const { userId } = ctx;

    const notice = new ctx.model.Notice();
    notice.userId = userId;
    notice.content = content;
    notice.publisher = 'system';
    await notice.save();
  }
}
