## 什么是comet
 comet 是一种用于web的推送技术， 能使服务器实时的将更新的信息传送到服务器，而无须客户端发出请求;

## 实现方式
  前端JQuery，后端PHP;

  前端实现方法:

    1. 引入JQuery

    function conn () {
      $.ajax({
        url: 'data.php',
        dataType: 'json',
        success: function (data) {
          console.log(data);
          conn(); // 请求成功后，再调用当前方法，达到连接一次实时请求
        }
      });
    }
    conn();

    PHP: 代码

      <?php
        header('Content-Type: application/json; charset=utf-8'); // 设置响应头
        header('Cache-control: max-age=0'); // 清除缓存
        $res = array('success' => 'ok', 'data' => '这是测试的内容');
        echo json_encode($res);
        sleep(1); // 隔一秒钟响应请求
      ?/>


  后端实现：

      1. 前端代码

        使用传统的ajax： XMLHttp 请求后台数据 此处省略

      2. 后端代码

      <?php
        header('Content-Type: application/json; charset=utf-8'); // 设置响应头
        header('Cache-control: max-age=0'); // 清除缓存

        while(true) {
          $res = array('success' => 'ok', 'data' => '这是测试的内容');
          echo json_encode($res);
          sleep(1); // 隔一秒钟响应请求
          // 此处加了后两句不会使代码进入死循环
          ob_flush(); // 吐出当前响应内容，但此处不向浏览器发送数据
          flush(); // 重新刷新
        }
      ?/>
