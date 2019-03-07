## PHP变量总结
  1. 函数外定义的变量为全局变量，除函数外可以在脚本中的任何地方访问
  
  2. 函数内定义的变量为局部变量，且只在函数内可被访问

  3. 所有的全局变量都保存在 $GLOBALS['变量名(key)']数组内

  4. 在函数内访问全局变量可以通过 关键字 global 或 $GLOBALS['key']

  ```
  <?php 
    $a = 2;
    $b = 3;
    function sum () {
      global $a, $b;
      $y = $a + $b;
      echo '$y';
    }
    sum(); => 5

    function add () {
      $GLOBALS['a'] = $GLOBALS['a'] + $GLOBALS['b'];
    }
    add();
    echo '$a'; => 5
  ?>
  ```

  5. static 修饰的局部变量在函数完成后不会被删除

```
  <?php
    function test () { 
      $count = 0; 
      echo '$count';
      $count++;
    }
    test(); => 0
    test(); => 0
    test(); => 0

    function staticTest () {
      static $count = 0;
      echo '$count';
      $count++;
    }
    staticTest(); => 0
    staticTest(); => 1
    staticTest(); => 2
  ?>
  ```