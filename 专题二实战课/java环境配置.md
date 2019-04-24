## Centos Java环境配置

### 下载jdk1.8 

  https://www.oracle.com/technetwork/java/javaee/downloads/jdk8-downloads-2133151.html

### scp jdk 至 Centos /usr/local/src 目录

### 安装

  mkdir /usr/local/java

  cp /usr/local/src/jkd-xx-xx-xx.tar.gz /usr/local/java

  cd /usr/local/java

  tar -zxvf jdk-xxx-linux-x64.tar.gz

### 设置环境变量

vi /etc/profile

在末尾追加:

    export JAVA_HOME=/usr/local/java/jdk_1.8
    export JRE_HOME=${JAVA_HOME}/jre
    export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
    export PATH=${JAVA_HOME}/bin:$PATH

使环境生效

    source /etc/profile

添加软链接

    ln -s /usr/local/java/jdk1.8.x/bin/java /usr/bin/java

检查是否安装成功

    java --version