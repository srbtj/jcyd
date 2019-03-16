## 变量申明
  ### 变量的赋值操作
    1. 编译器在当前作用域内声明一个变量(如果之前没有申明过);
    2. 运行时的引擎会在作用域中查找该变量，如果找到了变对其进行赋值，反之报错:变量未定义;


  ### this绑定规则
    1.  函数在new中调用时， this绑定的是实例对象

        var bar = new Foo();

    2.  函数通过 call, apply, bind 显示绑定或者硬编码绑定调用时， this绑定的是指定的对象

        var bar = foo.call(obj)

    3.  函数在某个上下文对象中调用时， this绑定的是那个上下文对象

        var bar = obj.foo

    4.  上边都不是时，使用默认绑定。 在非严格模式下，绑定到全局对象，否则绑定到 undefined


  ### 绑定例外

    将null, undefined 作为this绑定对象传入 call, apply 或者 bind 时，null, undefined 在调用时会被忽略， 实际应用的是默认绑定规则;

      function foo () {
        console.log(a);
      };

      var a = 2;

      foo.call(null); // 2


#### 1. 传入null的情况

    比较常见的做法是使用 apply() 来展开一个数组，并当作参数传一个函数。 类型与 bind(..) 可以对参数进行柯里化(预先设置一些参数)；

    function foo (a,bb) {
      console.log("a:" + a + ", b: " + b);
    };

    foo.apply(null, [2, 3]); // a: 2, b: 3

    var bar = foo.bind(null, 2);
    bar(3); // a: 2, b: 3

##### 注意点

    使用 null 来忽略this绑定可能产生一些副作用， 当第三方库中的一个函数使用this时， 那默认的绑定规则会把this绑定到全局对象；

    更安全的作法： 传入一个特殊的对象

    function foo (a, b) {
      console.log('a: ' + a + ', b: ' + b)
    };

    var nullObj = Object.create(null);

    foo.apply(nullObj, [2, 3]); // a: 2, b: 3

    var bar = foo.bind(nullObj, 2);
    bar(3);  // a: 2, b: 3;

#### 2. 间接引用

    当有意或无意地创建一个函数的 “间接引用”, 在这种情况下，调用这个函数会应用默认绑定规则;

    function foo () {
      console.log(this.a);
    };

    var a = 2;
    var o = {a: 3, foo: foo};
    var p = {a: 4};

    o.foo();  // a: 3

    (p.foo = o.foo)(); // 2


### 箭头函数 （箭头函数的绑定无法被修改， new也不行）

    词法: () => {}

    箭头函数不使用 this 的四种标准规则， 而是根据外层 (函数或者全局) 作用域来决定this;

    function foo () {
      return (a) => { console.log(this.a); };
    };

    var obj1 = { a: 2};
    var obj2 = { a: 3};

    var bar = foo.call(obj1);
    bar.call(obj2); // 2
