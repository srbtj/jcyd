var express = require('express');
var app = express();
var bodyparse = require('body-parser');

var urlencoded = bodyparse.urlencoded({extended: false});

app.use(express.static('public'));

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + '/views/' + 'index.html');
});

app.get('/login', function (req, res) {
  var response = {
    username: req.query.username,
    password: req.query.password
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

app.post('/login', urlencoded, function (req, res) {
  console.log(req.body)
  var response = {
    rd: req.body.password
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

var server = app.listen(8080, function () {
  console.log('启动服务...');
})
