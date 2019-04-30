// js页面切面编程
/** 
 *  主要功能:
 *    1. 性能监测
 *    2. 日志记录
 *    3. 异常处理等
**/

function test () {
  console.log('this is test method');
  // return 'test';
  return false;
}

// 函数执行之前的处理函数
Function.prototype.before = function (fn) {
  const _self = this;
  return function () {
    // 在目标函数执行之前，先执行before函数, 如果 before 提前终止了，此处也应该终止
    // fn.apply(_self, arguments)
    if (fn.apply(_self, arguments) === false) return false;
    return _self.apply(_self, arguments);
  }
}

// 函数执行之后的处理函数
Function.prototype.after = function (fn) {
  const _self = this;
  return function () {
    // 在目标函数执行之后，现执行after函数
    const result = _self.apply(_self, arguments);
    // 如果调用目标对象后终止了，此时不应该再调用after函数
    if (result === false) return false;
    fn.apply(_self, arguments);
    return result;
  }
}

/** 
 * 此处引入了链式调用:
 *  test.before() 执行后 返回一个闭包函数，然后再调用after() 后，
 *  再返回一个闭包函数，最后再执行
 * 
 * 为什么可经通过链式调用来实现呢:
 *  此处的 before, after 定义在 Function 原型链上
 *  所有的函数都是Function的实例， 所以可以采用链式调用的方式。
*/
// test.before(function () {
//   console.log('invoke before method')
// }).after(function () {
//   console.log('invoke after method');
// })();

var a = test.after(function () {
  console.log('after method')
}).before(function () {
  console.log('before method')
  // return false;
});
console.log(a());

// console.log(test.before(function () {
//   console.log('before method');
// }));