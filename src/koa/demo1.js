const Koa = require('koa');
// const Router = require('koa-router');
// const {logger, accessLogger} = require('./utils/log4j-config');
const router = require('koa-router')();
const app = new Koa();
// app.use(accessLogger());
// const router = new Router();
// app.use(async ctx => {
//   ctx.body = 'hello world';
// });
router.get('/', async (ctx) => {
  ctx.body = '首页';
});

router.get('/news', async (ctx) => {
  ctx.body = '这是新闻页';
});

// 加载路由中间件
app.use(router.routes())
   .use(router.allowedMethods());

app.listen(8080, function () {
  console.log('启动服务成功...');
});
