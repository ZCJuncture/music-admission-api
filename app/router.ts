import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;

  router.get('/user/checkStatus', middleware.token(), controller.user.checkStatus);
  router.post('/user/register', controller.user.register);
  router.post('/user/login', controller.user.login);
  router.get('/user/logout', middleware.token(), controller.user.logout);
};
