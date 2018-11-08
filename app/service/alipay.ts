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

  public async getPayUrl() {
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('returnUrl', 'http://www.baidu.com');
    formData.addField('notifyUrl', 'http://www.com/notify');
    formData.addField('bizContent', {
      outTradeNo: '20150320010101003',
      productCode: 'FAST_INSTANT_TRADE_PAY',
      totalAmount: '0.01',
      subject: '商品',
    });

    return await this.getInstance().exec('alipay.trade.page.pay', {}, { formData });
  }
}
