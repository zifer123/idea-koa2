/**
 * @description 环境变量
 * @author zifer
 * */
const ENV = process.env.NODE_ENV;
module.exports = {
  isDev: ENV === 'development',
  isProd: ENV === 'production',
  isTest: ENV === 'test',
};
