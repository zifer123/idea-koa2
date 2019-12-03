/**
 * @description 配置文件
 * @author zifer
 * */
const { isDev, isProd } = require('../utils/env');

// 开发：redis配置
const REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
};

if (isProd) {
  // 生产：redis配置
  REDIS_CONF.port = 6378;
  REDIS_CONF.host = '111.230.172.203';

  // 生产：
}

module.exports = {
  REDIS_CONF,
};
