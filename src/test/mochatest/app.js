const express = require('express');
const app = express();

app.get('/user', function (req, res) {
  res.send({
    data: 'hello world'
  });
});

app.listen('3000', function () {
  console.log('start server....');
});

module.exports = app;
