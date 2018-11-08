import { Controller } from 'egg';

export default class EnrollController extends Controller {
  public async updateInfo() {
    const { ctx } = this;
    const { phoneNumber } = ctx;

    await ctx.model.User.updateOne({ phoneNumber }, ctx.request.body);
    ctx.status = 200;
  }

  public async uploadImage() {
    const { ctx } = this;
    const { phoneNumber } = ctx;
    const { type } = ctx.query;

    const fileName = await this.service.file.upload();

    if (type === 'credential') {
      await ctx.model.User.updateOne({ phoneNumber }, { credentialFile: fileName });
    } else if (type === 'photo') {
      await ctx.model.User.updateOne({ phoneNumber }, { photoFile: fileName });
    }

    ctx.body = fileName;
  }

  public async downloadImage() {
    await this.service.file.download();
  }

  public async deleteImage() {
    const { ctx } = this;
    const { phoneNumber } = ctx;
    const { type } = ctx.query;

    await this.service.file.delete();

    if (type === 'credential') {
      await ctx.model.User.updateOne({ phoneNumber }, { credentialFile: '' });
    } else if (type === 'photo') {
      await ctx.model.User.updateOne({ phoneNumber }, { photoFile: '' });
    }

    ctx.status = 200;
  }

  public async getAlipayUrl() {
    const { ctx } = this;
    ctx.body = await this.service.alipay.getPayUrl();
  }
}
