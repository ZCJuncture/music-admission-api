// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import News from '../../../app/model/news';
import PayItem from '../../../app/model/payItem';
import PayRecord from '../../../app/model/payRecord';
import User from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    News: ReturnType<typeof News>;
    PayItem: ReturnType<typeof PayItem>;
    PayRecord: ReturnType<typeof PayRecord>;
    User: ReturnType<typeof User>;
  }
}
