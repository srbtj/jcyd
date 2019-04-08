## koa-log4 中间件的使用

  koa-log4中间件是在log4js-node基本中进行的一次封装, 具有日志分级、日志分类、日志落盘等特点。

  ### 日志的配置 log-config.js
  ```
    const path = require('path');
    const log4js = require('koa-log4');

    log4js.configure({
      appenders: {
        access: {
          type: 'dateFile',
          pattern: '-yyyy-MM-dd',
          filename: path.join('logs', 'access.log'); // logs是自定义的目录名
        },
        application: {
          type: 'dateFile',
          pattern: '-yyyy-MM-dd',
          filename: path.join('logs', 'applicatioin.log')
        },
        out: {
          type: 'console'
        }
      },
      categories: {
        default: { appenders: ['out], level: 'info' },
        access: { appenders: ['access'], level: 'info' },
        application: { appenders: ['application'], level: 'warn' }
      }
    });

    exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access'));
    exports.logger = log4js.getLogger('application');
  ```

  ### 日志的使用方法

    1. 访问日志
    对于日志的使用，访问级别的，记录用户的所有请求，作为koa的中间件直接使用即可, 如
    ```
      const Koa = require('koa');
      const KoaRouter = require('koa-router');
      const app = new Koa();
      const router = new KoaRouter();
      const { accessLogger, logger } = require('./log-config');

      app.use(accessLogger()); // 将访问日志作为中间件直接访问
    ```

    2. 应用日志
      应用级别的日志， 可记录全局状态下的error, 也可记录接口请求当中的错误处理

      2-1: 捕获全局状态下的error
      app.on('error', err => {
        logger.error(err);
      });
      2-2: 接口请求错误
      router.post('/', async (ctx, next) => {
        // TODO
      } catch (e) {
        logger.error(e);
      })
