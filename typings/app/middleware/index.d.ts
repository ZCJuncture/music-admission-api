// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Pagination from '../../../app/middleware/pagination';
import Status from '../../../app/middleware/status';
import Token from '../../../app/middleware/token';

declare module 'egg' {
  interface IMiddleware {
    pagination: typeof Pagination;
    status: typeof Status;
    token: typeof Token;
  }
}
