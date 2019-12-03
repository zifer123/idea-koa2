/**
 * @description 测试redis的get set方法
 * @author zifer
 * */
const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');

const redisClinet = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClinet.on('error', (err) => {
  console.log(err);
});

/**
 * redis set
 * @param {string} key 键值
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位为秒，默认一小时
 * */
function set (key, val, timeout = 60 * 60) {
  if (typeof key === 'object') {
    key = JSON.stringify(key);
  }
  redisClinet.set(key, val, 'EX', timeout);
}

/**
 * redis get
 * */
function get (key) {
  return new Promise((resolve, reject) => {
    redisClinet.get(key, (err, val) => {
      if (err) {
        reject(err);
        return ;
      }
      if (typeof val === null) {
        resolve(null);
        return ;
      }

      // 值有可能是json字符串
      try {
        resolve(JSON.parse(val));
      } catch (e) {
        resolve(val);
      }
    });
  });
}

module.exports = {
  set,
  get,
};


