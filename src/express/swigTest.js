var express = require('express');
var swig = require('swig');
var app = express();

app.use(express.static(__dirname + '/public')); // 导入静态资源

app.engine('html', swig.renderFile); // 引入swig模板

app.set('view engine', 'html'); // 设置模板引擎

app.set('views', __dirname + '/views'); // 设置模板位置

app.set('view cache', false);
swig.setDefaults({cache: false});

app.get('/', function (req, res) { // 处理get请求
  var arrs = [
    { name: 'jack', age: '22' },
    { name: 'tom', age: '26' },
    { name: 'lili', age: '24' }
  ];
  res.render('testLayout', { title: '我是动态加载的标题', data: arrs });
});

app.listen(8080, function () {
  console.log('启动服务成功...');
});
