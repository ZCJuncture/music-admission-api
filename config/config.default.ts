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
      url: 'mongodb://123.206.27.201:27017',
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
      host: '123.206.27.201',
      password: '1248@bit.com',
      db: 0,
    },
  };

  return {
    ...config,
  };
};
