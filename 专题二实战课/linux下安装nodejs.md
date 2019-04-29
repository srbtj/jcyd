## Linux下安装 Nodejs 
  源: https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz

### cd /usr/local/src 
  wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz

### node安装

  1. 移到至 /usr/local 并解压文件
    cdp node-v10.15.3-linux-x64.tar.xz /usr/local
    tar -xvf node-v10.15.3-linux-x64.tar.xz

  2. 更改文件名
    mv node-v10.15.3-linux-x64 node

  3. 添加全局访问
    ln -s /usr/local/node/bin/node /usr/bin/node
    ln -s /usr/local/node/bin/npm /usr/bin/npm
    ln -s /usr/local/node/bin/npx /usr/bin/npx

  4. 添加全局环境配置信息
    vi ~/.bash_profile
    export NODE_ENV=/usr/local/node
    PATH=$PATH:$NODE_ENV/bin

  保存并退出(如查不加环境变量信息，全局安装包时可能会访问不到)

  5. 验证是否配置成功
    node -v
    npm -v 
    npx -v
  
  显示对应的版本信息，表示安装及配置成功

  