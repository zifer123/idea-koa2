/**
 * Author zifer
 * Date 2019-12-06 17:27
 * Description 文件说明
 * */
const request = require('./server');

test('response data shuold like {code: 200}', async () => {
  const response = await request.get('/jsonData');
  expect(response.body).toEqual({
    code: 200,
  });
});
