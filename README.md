# spider
构建本地可视化的简单爬虫界面

安装或升级最新版本`node.js`

配置`phantomjs`[http://phantomjs.org/download.html]环境

全局安装：`npm install pm2 -g`

下载源码：`git clone git@github.com:Y-Ulia/spider.git`

进入目录：`cd spider`

安装依赖：`npm install` 

启动服务：`pm2 start spider_api.js`

打开链接：`localhost:8080`

点击send，可查看demo链接数据

更改爬虫链接，更改CSS选择器，获取网站单一的DOM结构

根据输入变量、输出变量，编写需要获取数据的可执行脚本，可使用JQuery语法

点击发送即可获取并显示JSON数据