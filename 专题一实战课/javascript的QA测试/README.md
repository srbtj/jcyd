### 测试
  #### 测试文件的书写
    1. 需要测试的文件: 如 index.js
    2. 测试文件: index.spec.js

  #### 单元测试Js:

      目的: 单元测试能够让开发者明确知道代码结果;

      原则: 单一职责, 接口抽象(纯函数), 层次分离;

      断言库: 保证最小单元是否正常运行检测方法;

      测试风格:
        TDD(测试驱动开发): 关注所有的功能是否被实现
        BDD(行为驱动开发): 关注整体功能是否实现，然后再进行测试(目前国内主要是这种)

      框架:
        1. chai.js (TDD, BDD)
        2. jasmine.js (BDD)

  #### 自动化单元测试

      karma 自动化 runner 集成 PhantomJS(无头浏览器) 无刷新

      依赖js

        npm install karma --g

        npm install karma-cli -g

        npm install karma-chrome-launcher --save-dev

        npm install karma-phantomjs-launcher --save-dev

        npm install karma-mocha --save-dev

      报告和单测覆盖率检查

        npm install karma-coverage --save-dev


  #### 功能测试 e2e

      selenium-webdirver  (js操作DOM)

  #### UI测试

      phantomcss

      backstop (主要用这个)



