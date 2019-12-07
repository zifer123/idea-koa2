const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
  if (!ctx.session.testNum) {
    ctx.session.testNum = 0;
  }
  ctx.body = {
    title: 'koa2 json',
    testNum: ctx.session.testNum++,
  }
});

router.get('/jsonData', async (ctx, next) => {
  ctx.body = {
    code: 200,
  };
});

module.exports = router;
