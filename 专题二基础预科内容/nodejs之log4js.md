log4js是Nodejs日志处理中的模块。比起 console 有其优化，主要表现在:
  ```
    1. 日志分级
    2. 日志分类
    3. 日志落盘
  ```
### 小试牛刀
```
  var log4js = require('log4js');
  var logger = log4js.getLogger();
  logger.debug('Time', Date.now());
```

调用 .getLogger() 获得 log4js 实例， 这个实例的用法与 console 一致的， 要以调用 debug/info/err等来输出日志。

### Level （分级）
日志分级: 日志分级后， log4js才能更好的我们展示日志(不同级别的日志在控制台有采用不同的颜色), 在生产中可以有选择的输入日志， 避免一些敏感信息泄露。

log4js的日志分九个等级: 指定的级别我名字和权重。
```
  {
    ALL: new Level(Number.MIN_VALUE, 'ALL')，
    TRACE: new Level(5000, 'TRACE'),
    DEBUG: new Level(10000, "DEBUG"),
    INFO: new Level(20000, "INFO"),
    WARN: new Level(30000, "WARN"),
    ERROR: new Level(40000, "ERROR"),
    FATAL: new Level(50000, "FATAL"),
    MARK: new Level(9007199254740992, "MARK"), // 2^53
    OFF: new Level(Number.MAX_VALUE, "OFF")
  }
```

### Category （类型）
日志类型: 设置 Logger 实例的类型， 按照另一个维度来区分日志
````
  var log4js = require('log4js');
  var logger = log4js.getLogger('example');
  logger.debug('Time:', Date.now());
````

在通过 getLogger 获取 Logger 实例时， 唯一可传的一个参数: loggerCategory(如 'example'), 通过这个参数指定 Logger 实例属于哪一个类别.

类别作用: 为日志提供了第二个区分的维度， 例如你可以为每个文件设置不同的 category, 这样可以区分日志来源于哪个模块。

### Appender （日志输出）
日志的级别，分类解决了日志入口定级及分类分类问题， 在log4js中日志的输出就由 Appender 来解决。

默认的日志输出 : console（控制台）
```
  defaultConfig = {
    appenders: [{
      type: 'console'
    }]
  }
```

设置自己的 Appender:  log4js.configure
```
  var log4js = require('log4js');
  log4js.configure({
    appenders: [{
      type: 'file',
      filename: 'default.log
    }]
  });
  var logger = log4js.getLogger('customer-appender');
  logger.debug('')
```

### log4js提供的 appender

    1. console: 输出到控制台
    2. file: 输出到文件
    3. DateFile: 日志输出到文件， 日志文件可以按特定的日期模式滚动
    4. SMTP: 输出日志到邮件
    5. Mailgun: 通过 Mailgun API 输出日志到 Mailgun;
    6. levelFilter: 通过 level 过滤

### Layout
  Layout 是 log4js 提供的高级功能， 通过layout可以自定义每一条输出日志的格式.

      1. messagePassThrough： 仅仅输出日志的内容
      2. basic: 在日志的内容前面加上时间，日志的级别和类别， 通常日志的默认layout;
      3. colored/coloured: 在basic的基础上给日志加上颜色， appender Console默认使用的就是这个layout;
      4. pattern: 一种特殊类型，通过它来定义任何想要的格式

