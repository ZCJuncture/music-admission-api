import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller, middleware } = app;
  const { user, news, enroll } = controller;
  const { token, submitted, pagination } = middleware;

  router.get('/user/checkStatus', token(), user.checkStatus);
  router.post('/user/register', user.register);
  router.post('/user/login', user.login);
  router.get('/user/logout', token(), user.logout);

  router.get('/news/getList', pagination(), news.getList);

  router.post('/enroll/updateInfo', token(), submitted(false), enroll.updateInfo);
  router.post('/enroll/modifyInfo', token(), enroll.modifyInfo);
  router.post('/enroll/uploadImage', token(), submitted(false), enroll.uploadImage);
  router.get('/enroll/downloadImage', token(), enroll.downloadImage);
  router.get('/enroll/deleteImage', token(), submitted(false), enroll.deleteImage);
  router.get('/enroll/getAlipayUrl', token(), submitted(true), enroll.getAlipayUrl);
};
