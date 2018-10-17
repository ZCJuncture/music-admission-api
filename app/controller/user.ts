import { Controller } from 'egg';
import * as jwt from 'jsonwebtoken';

export default class UserController extends Controller {
  public async checkStatus() {
    this.ctx.body = 'token passed';
  }

  public async register() {
    const { ctx } = this;
    const { phoneNumber, password } = ctx.request.body;

    ctx.validate({
      phoneNumber: /^1[345789]\d{9}$/,
      password: 'password',
    });

    const user = new ctx.model.User();
    user.phoneNumber = phoneNumber;
    user.password = password;
    await user.save();

    ctx.body = '注册成功';
  }

  public async login() {
    const { ctx } = this;
    const { phoneNumber, password } = ctx.request.body;

    ctx.validate({
      phoneNumber: /^1[345789]\d{9}$/,
      password: 'password',
    });

    const user = await ctx.model.User.findOne({ phoneNumber, password });

    if (user) {
      const token: string = jwt.sign({
        phoneNumber,
        time: Math.floor(Date.now() / 1000),
      }, 'music-admission');

      ctx.app.redis.set(phoneNumber, token);
      ctx.body = { user, token };

    } else {
      ctx.status = 401;
      ctx.body = '用户名或密码错误';
    }
  }

  public async logout() {
    const { ctx } = this;
    const { phoneNumber } = ctx;

    ctx.app.redis.del(phoneNumber);
    ctx.body = '注销成功';
  }
}
