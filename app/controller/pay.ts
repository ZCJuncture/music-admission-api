import { Controller } from 'egg';

export default class PayController extends Controller {
  public async getPayList() {
    const { ctx } = this;
    const { userId } = ctx;

    const list = await ctx.model.PayItem.find({ enabled: true });
    for (const item of list) {
      item.record = await ctx.model.PayRecord.findOne({ userId, itemId: item._id });
    }

    ctx.body = list;
  }

  public async getPayInfo() {
    const { ctx } = this;
    const { userId } = ctx;
    const { payType, itemId } = ctx.query;
    let { orderId } = ctx.query;

    if (!orderId) {
      orderId = this.generateOrderId();
      let record = await ctx.model.PayRecord.findOne({ userId, itemId });

      if (record) {
        record.orders.push({ _id: orderId, payType });
        await record.save();

      } else {
        record = new ctx.model.PayRecord();
        record.userId = userId;
        record.itemId = itemId;
        record.orders.push({ _id: orderId, payType });
        await record.save();
      }
    }

    const item = await ctx.model.PayItem.findById(itemId);
    item.orderId = orderId;

    if (payType === 'alipay') {
      ctx.body = {
        orderId,
        payUrl: await this.service.alipay.getPayUrl(item),
      };

    } else if (payType === 'wxpay') {
      ctx.body = {
        orderId,
        payUrl: 'https://pay.weixin.qq.com/wiki/doc/api/index.html',
      };
    }
  }

  public async getPayResult() {
    const { ctx } = this;
    const { payType, orderId } = ctx.query;

    if (payType === 'alipay') {
      const result = await this.service.alipay.queryResult(orderId) as any;

      if (result.tradeStatus === 'TRADE_SUCCESS') {
        await this.handleResult(orderId, result.buyerLogonId);
      }

      ctx.body = result;

    } else if (payType === 'wxpay') {
      ctx.status = 200;
    }
  }

  public async notifyPayResult() {
    const { ctx } = this;
    const { out_trade_no, buyer_id } = ctx.request.body;

    const verified = this.service.alipay.checkNotifySign(ctx.request.body);

    if (verified) {
      await this.handleResult(out_trade_no, buyer_id);
      ctx.body = 'success';

    } else {
      ctx.status = 403;
    }
  }

  private async handleResult(orderId: string, payAccount: string) {
    const { ctx } = this;

    const session = await this.app.mongoose.startSession();
    session.startTransaction();

    const record = await ctx.model.PayRecord.findOne({ 'orders._id': orderId }).session(session);
    if (record.paid) {
      await session.abortTransaction();
      return;
    }

    for (const order of record.orders) {
      if (order._id === orderId) {
        order.payAccount = payAccount;
        order.payDate = Date.now();
        record.paid = true;
        await record.save();
        break;
      }
    }

    const { stage } = await ctx.model.PayItem.findById(record.itemId).session(session);
    await ctx.model.User.findByIdAndUpdate(record.userId, { status: stage === '初试' ? 20 : 50 }).session(session);

    await session.commitTransaction();

    if (stage === '初试') {
      ctx.service.notice.autoSend('您已缴费成功，请在规定的时间段打印准考证。');
    }
  }

  private generateOrderId() {
    const dateObj = new Date();

    const year = dateObj.getFullYear();
    const month = this.addZero(dateObj.getMonth() + 1);
    const date = this.addZero(dateObj.getDate());
    const hour = this.addZero(dateObj.getHours());
    const minute = this.addZero(dateObj.getMinutes());
    const second = this.addZero(dateObj.getSeconds());
    const millisecond = this.addZero(dateObj.getMilliseconds());
    const random = Math.floor(Math.random() * 1000);

    return '' + year + month + date + hour + minute + second + millisecond + random;
  }

  private addZero(value: number) {
    if (value < 10) { return '0' + value; } else { return value; }
  }
}
