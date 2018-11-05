import { Controller } from 'egg';
import * as fs from 'fs';
import * as path from 'path';
import * as sendToWormhole from 'stream-wormhole';
import * as uuid from 'uuid';

export default class EnrollController extends Controller {
  public async updateInfo() {
    const { ctx } = this;
    const { phoneNumber } = ctx;

    await ctx.model.User.updateOne({ phoneNumber }, ctx.request.body);
    ctx.status = 200;
  }

  public async uploadFile() {
    const { ctx } = this;
    const readStream = await ctx.getFileStream();
    const fileName = uuid() + path.extname(readStream.filename);
    const target = path.join(this.config.baseDir, 'files/' + fileName);

    try {
      const writeStream = await fs.createWriteStream(target);
      await readStream.pipe(writeStream);
    } catch (e) {
      sendToWormhole(readStream);
    }

    ctx.body = fileName;
  }

  public async downloadFile() {
    const { ctx } = this;
    const { fileName } = ctx.query;

    const target = path.join(this.config.baseDir, 'files/' + fileName);
    ctx.body = await fs.createReadStream(target);
  }

  public async deleteFile() {
    const { ctx } = this;
    const { fileName } = ctx.query;

    const target = path.join(this.config.baseDir, 'files/' + fileName);
    if (fs.existsSync(target)) { fs.unlinkSync(target); }
    ctx.status = 200;
  }
}
