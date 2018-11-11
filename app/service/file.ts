import { Service } from 'egg';
import * as fs from 'fs';
import * as path from 'path';
import * as sendToWormhole from 'stream-wormhole';
import * as uuid from 'uuid';

export default class FileService extends Service {
  public async upload() {
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

    return fileName;
  }

  public async download() {
    const { ctx } = this;
    const { fileName } = ctx.query;

    const target = path.join(this.config.baseDir, 'files/' + fileName);
    ctx.body = await fs.createReadStream(target);
    ctx.set('Content-Type', this.getContentType(fileName));
    ctx.set('Content-Disposition', `filename="${fileName}"`);
  }

  public async delete() {
    const { ctx } = this;
    const { fileName } = ctx.query;

    const target = path.join(this.config.baseDir, 'files/' + fileName);
    if (fs.existsSync(target)) { await fs.unlinkSync(target); }
  }

  private getContentType(fileName: string) {
    switch (path.extname(fileName)) {
      case '.jpg':
      case '.jpeg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.gif':
        return 'image/gif';
      default:
        return 'application/octet-stream';
    }
  }
}
