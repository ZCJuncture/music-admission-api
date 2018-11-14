import { Controller } from 'egg';

export default class EnrollController extends Controller {
  public async updateInfo() {
    const { ctx } = this;
    const { userId } = ctx;

    await ctx.model.User.findByIdAndUpdate(userId, ctx.request.body);
    ctx.status = 200;
  }

  public async modifyInfo() {
    const { ctx } = this;
    const { userId } = ctx;
    const { collegeExamNo, provinceExamNo } = ctx.request.body;

    await ctx.model.User.findByIdAndUpdate(userId, { collegeExamNo, provinceExamNo });
    ctx.status = 200;
  }

  public async uploadImage() {
    const { ctx } = this;
    const { userId } = ctx;
    const { type } = ctx.query;

    const fileName = await this.service.file.upload();

    if (type === 'credential') {
      await ctx.model.User.findByIdAndUpdate(userId, { credentialFile: fileName });
    } else if (type === 'photo') {
      await ctx.model.User.findByIdAndUpdate(userId, { photoFile: fileName });
    }

    ctx.body = fileName;
  }

  public async downloadImage() {
    await this.service.file.download();
  }

  public async deleteImage() {
    const { ctx } = this;
    const { userId } = ctx;
    const { type } = ctx.query;

    await this.service.file.delete();

    if (type === 'credential') {
      await ctx.model.User.findByIdAndUpdate(userId, { credentialFile: '' });
    } else if (type === 'photo') {
      await ctx.model.User.findByIdAndUpdate(userId, { photoFile: '' });
    }

    ctx.status = 200;
  }
}
