const Koa = require('koa');
const app = new Koa();

// 定义logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.set({'X-Response-Time': `${ms}ms`});
});

app.keys = ['im a newer secret', 'i like turtle'];

app.use(async ctx => {
  ctx.cookies.set('name', 'tobi', {signed: true});
  ctx.body = `hello world`;
});

app.listen(8080, function () {
  console.log('启动服务成功...');
});
