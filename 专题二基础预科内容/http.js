var http = require('http');

http.createServer(function (req, res) {
  // 响应头
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('hello world');
}).listen(8080);
console.log('start serve and port 8080');
