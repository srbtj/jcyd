// 创建Promise构造函数
function Promise(fn) {
  // 成功时的回调
  var callback;
  // 注册异步事件
  this.then = function (done) {
    callback = done;
  }

  function resolve () {
    setTimeout(function () {
      callback();
    }, 0)
  }

  function reject () {
    // callback && callback(); // 直接写，此时还未调用then,即没有给callback赋值，报错
    setTimeout(function () {
      callback();
    }, 0)
  }
  // 返回调用成功时的回调函数
  fn(resolve);
}

function request () {
  return new Promise(function (resolve, reject) {
    // 异步请求接口数据并返回调用状态
    if (true) resolve();
  });
};

request().then(function (data) {
  // 接口调用成功
  console.log('接口调用成功');
}, function (err) {
  // 接口调用失败
  console.log('接口调用失败');
});
