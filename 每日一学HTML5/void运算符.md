## void 运算符
  对给定的表达式进行求值， 然后返回 undefined;

## 语法
  void express

## 描述

  void运算符能向期望一个表达式的值是 undefined 的地方插入会产生副作用的表达式。 <br />

  void 运算符通常中用于获取 undefined 的原始值， 一般使用 void(0) 或 void 0;

## 立即调用函数表达式

  在使用 立即执行的函数表达式 中，利用 void 运算符 让 js 引擎把一个 function 关键字 识别为函数表达式 而不是 函数声明;

  ```
  void function test () {}(); 
  等同于
  (function test () {})()
  ```

## 在URL中使用
  当点击一个以 javascript: URL时， 它会执行URL中的代码， 然后用返回的值替换页面内容， 除非返回 undefined.  void 运算符可用于返回 undefined;