import { Application } from 'egg';
import * as fs from 'fs';
import * as path from 'path';

export default (app: Application) => {
  app.beforeStart(() => {
    const dir = path.join(app.config.baseDir, 'files');
    if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }
  });
};
