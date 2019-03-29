// const assert = require('assert');
const app = require('./app');
// describe('Array', function () {
//   describe('#indexOf methods', function () {
//     it('should return -1 when the value is not preset', function () {
//       assert.equal([1,2,3].indexOf(4), -1);
//     });
//     // it('double done', function (done) {
//     //   setImmediate(done);
//     //   // setImmediate(done);
//     // });
//   });
// });

describe('user', function () {
  describe('/user', function (done) {
    it('get /user back data', function (done) {
      app.get('/user', function (err, res) {
        if (err) done(err);
        else {
          console.log(res);
          done();
        }
      })
    })
  })
})
