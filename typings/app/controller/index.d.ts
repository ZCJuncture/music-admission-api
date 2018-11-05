// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Enroll from '../../../app/controller/enroll';
import News from '../../../app/controller/news';
import User from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    enroll: Enroll;
    news: News;
    user: User;
  }
}
