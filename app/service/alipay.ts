import Alipay from 'alipay-sdk';
import AlipayFormData from 'alipay-sdk/lib/form';
import { Service } from 'egg';
import * as fs from 'fs';
import * as path from 'path';

export default class AlipayService extends Service {
  private static instance: Alipay;

  public getInstance() {
    if (!AlipayService.instance) {
      const privatePath = path.join(this.config.baseDir, 'keys/alipay-private.pem');
      const publicPath = path.join(this.config.baseDir, 'keys/alipay-public.pem');

      AlipayService.instance = new Alipay({
        appId: this.config.alipay.appId,
        gateway: this.config.alipay.gateway,
        privateKey: fs.readFileSync(privatePath, 'ascii'),
        alipayPublicKey: fs.readFileSync(publicPath, 'ascii'),
      });
    }

    return AlipayService.instance;
  }

  public async getPayUrl(item: any) {
    const formData = new AlipayFormData();
    formData.setMethod('get');

    formData.addField('returnUrl', (process.env.NODE_ENV === 'development' ?
      'http://localhost:8080' : this.config.alipay.domain) + '/home/onlinePay');
    formData.addField('notifyUrl', this.config.alipay.domain + '/api/pay/notifyPayResult');

    formData.addField('bizContent', {
      productCode: 'FAST_INSTANT_TRADE_PAY',
      outTradeNo: item.orderId,
      subject: item.name,
      totalAmount: item.amount,
    });

    return await this.getInstance().exec('alipay.trade.page.pay', {}, { formData, validateSign: true });
  }

  public async queryResult(orderId: string) {
    return await this.getInstance().exec('alipay.trade.query', {
      bizContent: { outTradeNo: orderId },
    }, { validateSign: true });
  }

  public checkNotifySign(data: any) {
    return this.getInstance().checkNotifySign(data);
  }
}
