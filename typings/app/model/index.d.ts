// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import News from '../../../app/model/news';
import User from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    News: ReturnType<typeof News>;
    User: ReturnType<typeof User>;
  }
}
