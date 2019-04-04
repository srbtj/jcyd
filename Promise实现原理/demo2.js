// 修改代码: 改成链式调用
function Promise(fn) {
  var promise = this,
      value = null;
  promise._resolves = [];

  // 成功时回调
  promise.then = function (handle) {
    promise._resolves.push(handle);
    return promise;
  }
  // 失败时回调
  promise.catch = function (err) {
    promise._resolves.push(err);
    return promise;
  }

  var resolve = function (value) {
    setTimeout(function () {
      promise._resolves.map(cb => {
        cb(value);
      });
    }, 0);
  }

  fn(resolve);
}

function request () {
  return new Promise(function (resolve, reject) {
    var a = 1;
    if (a >= 1) resolve(); 
  });
}

request().then(function (data) {
  console.log('调用成功')
});