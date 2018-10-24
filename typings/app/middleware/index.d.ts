// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Pagination from '../../../app/middleware/pagination';
import Token from '../../../app/middleware/token';

declare module 'egg' {
  interface IMiddleware {
    pagination: typeof Pagination;
    token: typeof Token;
  }
}
