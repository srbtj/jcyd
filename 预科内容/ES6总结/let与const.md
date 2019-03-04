## let易混淆及难理解的部分
  ### 一. 暂时性死区
    产生原因：
      1) let 拥有块级作用域
      2) 不存在变量提升的概念，只能先定义再使用

      ```
        function test (x = y, y = 2) {}
        test()
        报错原因: y在没有声明之前直接调用, 属于"死区"
        更改如下:
        function (y = 2, x = y) {}

        另容易忽略的表达式：
        var x = x; -> undefined
        let x = x; -> 报错, 原因:  变量x的声明语句还没有执行完成前，就去取 x 的值, 报错
      ```

  ### 二、 作用域与函数声明
    1) es5中只有全局与函数作用域;
    2) es5中规定，函数只能在顶层作用域及函数内声明，不能在块作用域内容声明
    ````
      es5中运行如下代码，产生鬼异现象
      function fn () { console.log('outside') }
      (function () {
        if (false) {
          function fn () { console.log('inside') }
        }
        fn() -> 'inside'
      })()
      产生此结果原因：
        浏览器在解析js时， es5中存在变量及函数提升，即执行时按如下代码解析
        function fn () { console.log('outside') }
        (function () {
          function () { console.log('inside') }
          if (false) {}
          fn() -> inside
        })()
    ````
    3) es6允许在块级作用域内声明函数，但处理方式比较特殊
      - 函数声明类型于var, 即会提升到全局作用域或函数作用域头部
      - 同时，函数声明还会提升到所在块级作用域的头部
      ```
      function fn () { console.log('outside') }
      (function () {
        if (false) {
          function fn () { console.log('inside') }
        }
        fn() -> 报错， fn is not function
      })()
      浏览器代码解析
      function fn () { console.log('outside') }
      (function () {
        var fn = undefined
        if (false) {
          function fn () {}
        }
        fn()
      })()
      ```
  ### 注意地方
    es6虽然可以在块作用域内声明函数，前提是块元素必须要有大括号
      if (true) { function () {} } -> 正确
      if (true) function () {} -> 报错

## const易混淆及难理解的部分
  ### 一、 const声明的变量必须立即赋值，不能留到后边赋值
  ### 二、 global 对象
    1) 全局对象， this返回顶层对象， node与es6模块中， this返回当前模块
    2）函数里this，如果不是作为对象的属性运行， this指向顶层对象， 但是在严格模式下， this 返回 undefined
    3) 不管理是严格还是普通函数， new Function('return this')() 总是会返回全局对象。 但如果浏览器设置的 SCP (Content Security Policy，内容安全策略)， 那么 eval， new Function 这些方法无法使用


## 引入global作用顶层对象的方式
  引入垫片库 system.global， 可以的所有环境中拿到 global
    require('system.global/shim')()
    // es6写法
    import shim from 'system.global'
    shim()
