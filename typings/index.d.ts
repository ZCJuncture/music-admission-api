import 'egg';
import { Redis, RedisOptions } from 'ioredis';

declare module 'egg' {
  interface Application {
    redis: Redis;
  }

  interface EggAppConfig {
    redis: EggRedisOptions;
  }
}

interface StandaloneOptions extends RedisOptions {
  password?: string;
}

interface ClusterOptions extends StandaloneOptions {
  cluster?: boolean;
  nodes?: StandaloneOptions[];
}

interface EggRedisOptions {
  default?: object;
  app?: boolean;
  agent?: boolean;
  client?: ClusterOptions;
  clients?: Record<string, StandaloneOptions>;
}
