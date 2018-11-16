import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller, middleware } = app;
  const { user, news, notice, enroll, pay } = controller;
  const { token, submitted, pagination } = middleware;

  router.get('/user/checkStatus', token(), user.checkStatus);
  router.post('/user/register', user.register);
  router.post('/user/login', user.login);
  router.get('/user/logout', token(), user.logout);

  router.get('/news/getNewsList', pagination(), news.getNewsList);
  router.get('/notice/getNoticeList', token(), pagination(), notice.getNoticeList);

  router.post('/enroll/updateInfo', token(), submitted(false), enroll.updateInfo);
  router.post('/enroll/modifyInfo', token(), enroll.modifyInfo);
  router.post('/enroll/uploadImage', token(), submitted(false), enroll.uploadImage);
  router.get('/enroll/downloadImage', token(), enroll.downloadImage);
  router.get('/enroll/deleteImage', token(), submitted(false), enroll.deleteImage);
  router.get('/enroll/getMajorList', enroll.getMajorList);
  router.get('/enroll/getExamInfo', enroll.getExamInfo);

  router.get('/pay/getPayList', token(), pay.getPayList);
  router.get('/pay/getPayInfo', token(), submitted(true), pay.getPayInfo);
  router.get('/pay/getPayResult', token(), submitted(true), pay.getPayResult);
};
