var express = require('express');

var app = express();

app.get('/test', function (req, res) {
  res.send({
    data: 'hello world'
  });
});

app.listen(3000, function () {
  console.log('listen 3000....');
});
