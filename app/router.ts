import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller, middleware } = app;
  const { user, news, enroll } = controller;
  const { token, pagination } = middleware;

  router.get('/user/checkStatus', token(), user.checkStatus);
  router.post('/user/register', user.register);
  router.post('/user/login', user.login);
  router.get('/user/logout', token(), user.logout);

  router.get('/news/getList', pagination(), news.getList);

  router.post('/enroll/updateInfo', token(), enroll.updateInfo);
  router.post('/enroll/uploadImage', token(), enroll.uploadImage);
  router.get('/enroll/downloadImage', token(), enroll.downloadImage);
  router.get('/enroll/deleteImage', token(), enroll.deleteImage);
  router.get('/enroll/getAlipayUrl', token(), enroll.getAlipayUrl);
};
