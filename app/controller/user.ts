import { Controller } from 'egg';
import * as jwt from 'jsonwebtoken';

export default class UserController extends Controller {
  public async checkStatus() {
    const { ctx } = this;
    const { phoneNumber } = ctx;
    ctx.body = await ctx.model.User.findOne({ phoneNumber }).select({ password: 0 });
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

    ctx.status = 200;
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
      const token = jwt.sign({
        phoneNumber,
        time: Math.floor(Date.now() / 1000),
      }, 'music-admission');

      ctx.app.redis.hset('token', phoneNumber, token);
      ctx.body = { user, token };

    } else {
      ctx.status = 401;
      ctx.body = '用户名或密码错误';
    }
  }

  public async logout() {
    const { ctx } = this;
    const { phoneNumber } = ctx;

    ctx.app.redis.hdel('token', phoneNumber);
    ctx.status = 200;
  }
}
