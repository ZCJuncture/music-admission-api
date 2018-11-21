// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Enroll from '../../../app/controller/enroll';
import Init from '../../../app/controller/init';
import News from '../../../app/controller/news';
import Notice from '../../../app/controller/notice';
import Pay from '../../../app/controller/pay';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    enroll: Enroll;
    init: Init;
    news: News;
    notice: Notice;
    pay: Pay;
    user: User;
  }
}
