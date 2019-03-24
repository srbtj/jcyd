const request = require('supertest');


const app = require('./test');

function req () {
  return request(app.listen())
};

describe('接口测试', function () {
  it('test接口测试', function (done) {
    req()
      .get('/test')
      .expect(200)
      .expect('Content-Type', 'json')
      .end(function (err, res) {
        if (err)  done(err)
        if (res.body.data === 'hello world') {}
      })
  })
})
