import { Controller } from 'egg';

export default class InitController extends Controller {
  public async init() {
    const { ctx } = this;

    const payItem = new ctx.model.PayItem();
    payItem.name = '初试收费';
    payItem.stage = '初试';
    payItem.amount = 100.00;
    payItem.enabled = true;
    await payItem.save();

    const payItem2 = new ctx.model.PayItem();
    payItem2.name = '复试收费';
    payItem2.stage = '复试';
    payItem2.amount = 200.00;
    payItem2.enabled = true;
    await payItem2.save();

    ctx.status = 200;
  }
}
