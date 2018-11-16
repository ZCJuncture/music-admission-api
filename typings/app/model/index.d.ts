// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import ExamInfo from '../../../app/model/examInfo';
import Major from '../../../app/model/major';
import News from '../../../app/model/news';
import Notice from '../../../app/model/notice';
import PayItem from '../../../app/model/payItem';
import PayRecord from '../../../app/model/payRecord';
import User from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    ExamInfo: ReturnType<typeof ExamInfo>;
    Major: ReturnType<typeof Major>;
    News: ReturnType<typeof News>;
    Notice: ReturnType<typeof Notice>;
    PayItem: ReturnType<typeof PayItem>;
    PayRecord: ReturnType<typeof PayRecord>;
    User: ReturnType<typeof User>;
  }
}
