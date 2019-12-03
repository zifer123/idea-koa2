const Sequelize = require('sequelize');
const conf = {
  host: 'localhost',
  dialect: 'mysql',
};
/*conf.pool = {
    max: 5,
    min: 0,
    idle: 10000, // 10s内没再次使用， 则释放此连接池
};*/
const seq = new Sequelize('weibo', 'root', 'zZ1046717797', conf);

seq.authenticate().then(() => {
  console.log('数据库连接成功')
}).catch(() => {
  console.log('数据库连接失败');
});

module.exports = seq;
