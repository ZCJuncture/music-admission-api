import { Controller } from 'egg';

export default class EnrollController extends Controller {
  public async updateInfo() {
    const { ctx } = this;
    const { userId } = ctx;

    if (ctx.request.body.status === 10) {
      const message = '您的报名信息已提交，请尽快在线缴费。';
      ctx.service.notice.autoSend(message);
      ctx.body = message;
    }

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

  public async getMajorList() {
    const { ctx } = this;

    let majorList: any = await ctx.app.redis.get('majorList');

    if (majorList) {
      ctx.body = JSON.parse(majorList);

    } else {
      majorList = await ctx.model.Major.find();
      ctx.app.redis.set('majorList', JSON.stringify(majorList));
      ctx.body = majorList;
    }
  }

  public async getExamInfo() {
    const { ctx } = this;
    const { major } = ctx.query;

    let examInfo = await ctx.app.redis.hget('examInfo', major);

    if (examInfo) {
      ctx.body = JSON.parse(examInfo);

    } else {
      examInfo = await ctx.model.ExamInfo.findById(major);
      ctx.app.redis.hset('examInfo', major, JSON.stringify(examInfo));
      ctx.body = examInfo;
    }
  }
}
