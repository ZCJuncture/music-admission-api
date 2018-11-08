import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  config.keys = appInfo.name + '_1539244274095_3267';

  config.pageSize = 10;

  config.middleware = [];

  config.security = {
    csrf: false,
    domainWhiteList: ['*'],
  };

  config.mongoose = {
    client: {
      url: 'mongodb://59.110.172.165:27017',
      options: {
        user: 'admin',
        pass: '1248@bit.com',
        dbName: 'music-admission',
        useNewUrlParser: true,
      },
    },
  };

  config.redis = {
    client: {
      port: 6379,
      host: '59.110.172.165',
      password: '1248@bit.com',
      db: 0,
    },
  };

  config.alipay = {
    appId: '2016092000553404',
    gateway: 'https://openapi.alipaydev.com/gateway.do',
  };

  return {
    ...config,
  };
};
