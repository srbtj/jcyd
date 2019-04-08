var express = require('express');

var app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('hello get');
});

app.post('/', function (req, res) {
  res.send('hello post');
});

app.get('/list', function (req, res) {
  res.send('list page');
});

var server = app.listen(8080, function () {
  console.log('启动服务...');
})
