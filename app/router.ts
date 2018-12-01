import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller, middleware } = app;
  const { user, news, notice, enroll, pay } = controller;
  const { token, status, pagination } = middleware;

  router.get('/user/checkStatus', token(), user.checkStatus);
  router.post('/user/register', user.register);
  router.post('/user/login', user.login);
  router.get('/user/logout', token(), user.logout);
  router.post('/user/resetPassword', user.resetPassword);
  router.post('/user/changePassword', token(), user.changePassword);

  router.get('/news/getNewsList', pagination(), news.getNewsList);
  router.get('/notice/getNoticeList', token(), pagination(), notice.getNoticeList);

  router.post('/enroll/updateInfo', token(), status(0, 0), enroll.updateInfo);
  router.post('/enroll/modifyInfo', token(), status(10, Number.MAX_VALUE), enroll.modifyInfo);
  router.post('/enroll/uploadImage', token(), status(0, 0), enroll.uploadImage);
  router.get('/enroll/downloadImage', token(), enroll.downloadImage);
  router.get('/enroll/deleteImage', token(), status(0, 0), enroll.deleteImage);
  router.get('/enroll/getMajorList', enroll.getMajorList);
  router.get('/enroll/getExamInfo', enroll.getExamInfo);
  router.get('/enroll/printTicket', token(), status(20, 20), enroll.printTicket);

  router.get('/pay/getPayList', token(), pay.getPayList);
  router.get('/pay/getPayInfo', token(), status(10, Number.MAX_VALUE), pay.getPayInfo);
  router.get('/pay/getPayResult', token(), status(10, Number.MAX_VALUE), pay.getPayResult);
  router.post('/pay/notifyPayResult', pay.notifyPayResult);
};
