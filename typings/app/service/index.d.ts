// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Alipay from '../../../app/service/alipay';
import File from '../../../app/service/file';

declare module 'egg' {
  interface IService {
    alipay: Alipay;
    file: File;
  }
}
