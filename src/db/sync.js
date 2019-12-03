const seq = require('./seq');

// 引入各种models，测试以下
require('../models');

// 测试连接
seq.authenticate().then(() => {
    console.log('ok')
}).catch(() => {
    console.log('error');
});

// 同步数据库
seq.sync({
  force: true,
}).then(() => {
  console.log('同步成功');
  process.exit();
}).catch((err) => {
  console.log(err);
});
