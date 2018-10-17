// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Token from '../../../app/middleware/token';

declare module 'egg' {
  interface IMiddleware {
    token: typeof Token;
  }
}
