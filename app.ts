import { Application } from 'egg';
import * as fs from 'fs';
import * as path from 'path';

export default (app: Application) => {
  app.beforeStart(() => {
    const dir = path.join(app.config.baseDir, 'files');
    if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }

    const tokenFile = path.join(app.config.baseDir, 'keys/token.pem');
    (app as any).tokenKey = fs.readFileSync(tokenFile, 'ascii');
  });
};
