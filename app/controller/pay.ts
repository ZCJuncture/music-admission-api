import { Controller } from 'egg';

export default class PayController extends Controller {
  public async getList() {
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
      const record = await ctx.model.PayRecord.findOne({ userId, itemId });

      if (record) {
        record.orders.push({ _id: orderId, payType });
        await record.save();

      } else {
        const newRecord = new ctx.model.PayRecord();
        newRecord.userId = userId;
        newRecord.itemId = itemId;
        newRecord.orders.push({ _id: orderId, payType });
        await newRecord.save();
      }
    }

    const item = await ctx.model.PayItem.findById(itemId);
    item.origin = ctx.header.origin + '/#/home/onlinePay';
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
    const { userId } = ctx;
    const { payType, itemId, orderId } = ctx.query;

    if (payType === 'alipay') {
      const result = await this.service.alipay.queryResult(orderId) as any;

      if (result.tradeStatus === 'TRADE_SUCCESS') {
        const record = await ctx.model.PayRecord.findOne({ userId, itemId });

        for (const order of record.orders) {
          if (order._id === orderId) {
            order.payAccount = result.buyerLogonId;
            order.payDate = Date.now();
            record.paid = true;
            await record.save();
            break;
          }
        }
      }

      ctx.body = result;

    } else if (payType === 'wxpay') {
      ctx.status = 200;
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
