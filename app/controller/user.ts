import { Controller } from 'egg';
import * as jwt from 'jsonwebtoken';

export default class UserController extends Controller {
  public async checkStatus() {
    const { ctx } = this;
    const { userId } = ctx;
    ctx.body = await ctx.model.User.findById(userId).select({ password: 0 });
  }

  public async register() {
    const { ctx } = this;
    const { phoneNumber, password } = ctx.request.body;

    ctx.validate({
      phoneNumber: /^1[345789]\d{9}$/,
      password: 'password',
    });

    let user = await ctx.model.User.findOne({ phoneNumber }).select({ password: 0 });

    if (!user) {
      user = new ctx.model.User();
      user.phoneNumber = phoneNumber;
      user.phoneNumber2 = phoneNumber;
      user.password = password;
      const { _id } = await user.save();

      ctx.userId = _id;
      ctx.service.notice.autoSend('同学，您好！欢迎您报考我校，请认真阅读相关招生内容。');
      ctx.status = 200;

    } else {
      ctx.status = 401;
      ctx.body = '手机号已注册';
    }
  }

  public async login() {
    const { ctx } = this;
    const { phoneNumber, password } = ctx.request.body;

    ctx.validate({
      phoneNumber: /^1[345789]\d{9}$/,
      password: 'password',
    });

    const user = await ctx.model.User.findOne({ phoneNumber, password }).select({ password: 0 });

    if (user) {
      const token = jwt.sign({ userId: user._id }, 'music-admission');
      await ctx.app.redis.hset('token', user._id, token);
      ctx.body = { user, token };

    } else {
      ctx.status = 401;
      ctx.body = '手机号或密码错误';
    }
  }

  public async logout() {
    const { ctx } = this;
    const { userId } = ctx;

    await ctx.app.redis.hdel('token', userId);
    ctx.status = 200;
  }
}
