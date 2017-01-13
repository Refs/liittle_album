# 小小相册Node.js实战

## 初始化工作环境

* 新建一个文件夹，并在文件夹中创建3个子文件夹，分别命名为modules controller views即MVC; 说白了mvc就是将东西放在一个文件夹里，以减少他们之间的耦合；彼此之间互相调用；

* 创建一个上传文件的文件夹uploads,一个呈递静态页面的文件夹pulic;一个存放模块的node_modules文件夹，一个app主文件app.js;

* 用npm init一个package.json文件；

* 创建一个jsconfig.json文件，方便智能提醒；使用typing初始化一个tds文件夹；

* 安装必要的node模块，以及tds文件；

* modules文件夹，是用来执行具体业务的，即最脏最累的活，要由modules文件夹去完成；

* app.js实际上就是一个中控中心，设置了一堆的东西app.set()，具体的路由交给函数去处理app.get("/",router.showIndex)，函数被写在了controller文件夹的包里；app.js是顶层，controller为控制层，modules为最底层的业务实现层；

* 谁在负责路由?app.js负责路由，controller中的router.js不负责路由，其只是函数的罗列，但是其罗列的就死**路由函数** 所以就起名为**路由函数**；

