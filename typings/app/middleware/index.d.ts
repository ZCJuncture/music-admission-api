// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Pagination from '../../../app/middleware/pagination';
import Submitted from '../../../app/middleware/submitted';
import Token from '../../../app/middleware/token';

declare module 'egg' {
  interface IMiddleware {
    pagination: typeof Pagination;
    submitted: typeof Submitted;
    token: typeof Token;
  }
}
