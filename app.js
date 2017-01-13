var router = require("./controller")
var express = require("express");
var app = express();

app.set("view engine", "ejs");
// 设置模板引擎

//接下来就是路由中间件；
app.use("/static",express.static("./public"))

// 第一步：将public文件夹共享出来，即public中的文件中的内容要能够直接被静态呈递，类似于apache的web容器；
// app.use(express.static("./public"))为app.use("/",express.static("./public"))的缩写；app.use的路由是靠前缀进行匹配的，即只要请求路径的前缀，满足"/"则后面的中间件"express.static()"就会执行； 由于默认的路径为/，中间件挂载没有指定路径，那么对于每个请求，这个中间件都会被执行。

/* 只要访问请求的路径前缀，与app.use挂载的路径相同，就会触发中间件。若能在托管目录中访问到静态文件，则直接将静态文件放回*/

// -----------分割线---------------

// 第二个中间件就是访问主页时，要干嘛 在controller文件夹中新建一个文件router.js，该文件向外暴露一个函数（中间件）;
/*
    exports.showIndex = function(req,res){
        res.send("我是首页")；
    }
*/ 
// 利用require将router.js引入到app.js中实现文件间的相互配合 var router = require("./controller/router.js") 引包时可以直接写"./controller",不过需要在controller文件夹中新建一个package.json文件，并将入口文件设置成为router.js; 
app.get("/",router.showIndex)
// 当访问进来时，就会直接调用回调函数router.showIndex,区别于原生node，此处的监听访问回调函数不用传参；这一点自己不好理解，理解的关键就是app.get() 是一个中间件，其上面有一个中间件，app.use(express.static("./public"));app.get()回调函数的参数，就是从上面中间件传下来的；

app.get("/admin",router.showAdmin)
// 第三步 是使用中间件的时候，要提防路由被静态文件占据；
// 例如此时在public文件中新建一个文件夹admin并在文件夹内新建一个文件index.html;此时若在建一个动态路由中间件app.get("./admin",function(){ res.send("我是一个动态路由") })；就永远不会执行，因为走到app.use(express.static("./public"))时就将public中的admin文件夹内的index.html返回了；永远流不到下面去；

// 如果不想被静态文件占据，可以给静态文件中间件，添加一个私有前缀：app.use("/static",express.static("./public")) 即只有req.baseUrl =static时，才会去呈递pulic文件夹；app.use(express.static("public"))是app.use("/",express.static("./public"))的省略写法；注意app.use与app.get的区别，前者是重要路由前缀匹配到就会执行回调，而后者是只有路由严格相等才会执行回调；即"127.0.0.1:3000/admin"会匹配app.get("/admin",callback),会匹配app.use("/",callback),但不会匹配app.get("/",callback);

// express中有一点区别于原生就是路径"/"之前是不加点的app.get("/admin",callback)是正确的；而app.get("./admin",callback)则是错误的；
app.get("/:albumName",router.showAlbum)
//app.get接收到匹配的路由访问时，就会执行相应的动作，执行完毕之后调用回调函数，调用时会将res与req传参给回掉函数；相应的回调函数在执行过程中，可以调用req.params.albumName这样的变量；

app.listen(3000);

//可以成功返回“我是主页”，


