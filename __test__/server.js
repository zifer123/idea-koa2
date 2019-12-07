/**
 * Author zifer
 * Date 2019-12-06 17:25
 * Description 专门测试接口的工具
 * */
const request = require('supertest');
const app = require('../src/app');

// module.exports = request(app.listen());
module.exports = request(app.callback());

