当登录到Linux系统启动一个bash shell时，默认情况下bash会在几个文件中查找命令。 这些文件叫作启动文件或者环境文件。 bash检查的启动文件取决于你启动bash shell的方式。启动bash shell方式有三种: <br />
    1. 登录时作为默认登录shell <br />
    2. 作为非登录shell的交互式shell <br />
    3. 作为运行脚本的非交互shell <br />

## 登录 shell

  登录shell时会从下边5个不同的文件里读取命令: <br />
    1) /etc/profile <br />
    2) $HOOME/.bash_profile <br />
    3) $HOME/.bashrc <br/>
    4) $HOME/.bash_login <br/>
    5) $HOME/.profile <br />

  /etc/profile文件是系统上默认的bash shell的主启动文件。系统上的每个用户登录时都会执行这个启动文件。  <br />

  另4个启动文件是针对用户的。可根据个人需求定制； <br />

  .bash_profile启动文件在启动时会先去检查HOME目录下是否还有一个.bashrc的启动文件，如果有，会先执行启动文件里面的命令.

## 交互式shell进程

  如果bash shell不是通过登录系统时启动的(比如是在命令行提示符下输入 bash时启动), 这时启动的shell叫交互式shell; <br />

  当是交互式shell启动时， 它不会访问/etc/profile文件，只会检查用户HOME目录中的.bashrc文件。 <br />

## 非交互式shell

  系统执行shell脚本时用的就是这种shell; 不同的是它没有命令行提示符。 <br />

  为了处理这种情况， bash shell提供了一个 BASE_ENV 环境变量。 当shell启动一个非交互式shell进程时， 它会检查这个环境变量来查看要执行的启动文件。 <br />

  Centos 发行版中，环境变量在默认情况下并未设置。此时输入 printenv BASH_ENV 会返回空，但为什么脚本会执行呢? <br />

  子shell可以继承父shell导出过的变量。 所以就算没有设置BASH_ENV，也可以使用当前shell的局部变量和全局变量 <br />