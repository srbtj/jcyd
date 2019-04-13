### CentOS7下执行 yum 出错及解决办法

  One of the configured repositories failed (Unknown) ...

  1. 第一步: vi /etc/resolv.conf，添加下面一行就可以了

    nameserver 114.114.114.114（这是国内的dns服务器系统，还是比较好用的。谷歌的可以使用8.8.8.8）

  保存后， service network restart 重启， 执行  yum update 看此时是否成功，如果还不成功，执行第二步

  2. cd /etc/yum.repos.d   vi CentOS-Base.repo

      将 [base] [updates] [extras] 及 [centosplus] 下的 mirrolist 注释掉， 取消 baseUrl  注释 <br />

      保存并退出， 此时再执行 yum update; 此时 应该会成功

  3. 如果还不行， cd /etc/sysconfig/network-scripts/ifconf-emp0s3

      修改  ONBOOT=yes;
