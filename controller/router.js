
var file = require("./../modules/file");
// require 去引自己想要的包；直接ctrl + shift + H 调用relative path插件就可以了； 

exports.showIndex = function(req,res){

        //=====> res.render("index",{
        // albums:["aa","bb","cc"] //这个数组是假定的用于测试模板页面的；实际上是通过fs逻辑读取出来的；
        // albums的值为一个数组，这个数组是通过函数getAllAlbums来获取，这个函数返回的是一个数组；
        /*function getAllAlbums(){
            return ["小猫","小狗"]
        }*/
        //=====> albums:file.getAllAlbums()
        //传一个数组给albums，模板index.ejs就能工作，相对来说，函数返回值一个数组，则albums的值就能用函数的自运行表达式替换；这样albums的值依旧是一个数组，index.ejs依旧能够工作；  但区别在于，逻辑的中间过程不同，这一套逻辑，走了views constroller modules 即走了一套完整的mvc; 本来在app.js文件中就能完成的一套逻辑，硬生生的被分为了三处；这一点对于理解mvc很重要；将一套逻辑分为三处去写；

        /*
        app.get("/",function(req,res){
            res.render("index",{
                albums:(function(){
                    return ["小猫","小狗"]
                })()
            })
        })
        */

        //******内层函数造成问题的解释******* albums的值是一个函数getAllAlbuns执行表达式，这个函数确实可以返回一个数组(见modules中的file.js)，但这个函数是异步的，即函数showindex在执行过程中，执行流会忽略getAllAlbums的执行；即res.render()执行时，getAllAlbums还没有返回； 解决办法是，将showIndex函数中，需要等getAllAlbums执行返回的业务，放到 getAllAlbums函数的回调函数中；
         //======> });

        file.getAllAlbums(function(err,albums){
           if(err){
               res.send("找不到该页面")
           }
            res.render("index",{
                albums:albums
            })
        })
        
        //内层函数既然是异步的，则其就应该提供回调函数参数<启示：内层函数定义的时候要有callback参数，function fn1(callback){}>，回调函数有其上层函数提供<启示是，上层函数在调用时，需传入回调函数，如fn1(option,function(){}) 这种写法类似一般的api函数调用>； 在函数执行完毕之后，不会将结果return,而是会将本应return回去的数据，当做参数传入上层函数提供的回调函数中，并执行回调；理解并看懂这个模式，这个固定模式，很巧妙；

        // *************这就是node.js的编程思维，就是所有的东西都是异步的，所以内层函数不是return回来数据，而是调用高层函数提供的回调函数，并将本应return回去的数据，当作参数传到回调函数中去执行；mvc就是为配合这个编程思维产生的框架，首先函数都是分层的，层次分明的；app.js是顶层；controller为控制层；modules为业务底层；***************老师重点总结；node.js中都是先干具体的事，干完事后，回调中再干上层的事情；结合以前自己函数求导的的所悟，直接干最核心的，外层的回调的时候再干； 都是分层的；

        //mvc中app.js与router.js中的函数，都只写一层，底层都交给models层去处理；

        // 剩余的业务就是err的错误上传，完成这一点，这个逻辑（function）就结束了；
        /*------------
        函数的翻译：（一种翻译模式，就是一种思维模式，思维模式可以具体化到以何种方式翻译之中）
        student.getDetailByXueHao("234234",function(detail){});
        通过学号234234异步获取学生的detail,获取之后调取未命名函数（要做什么。。）；
        http.createserver(req,res,function(){});
        监听请求，监听到请求之后，调用回调函数；

        1.app.get("/",router.showIndex)；
        //上面的逻辑是先获取url为"/"的请求，而后去渲染主页showIndex; “领导：：我们要去完成什么。。”
        2.function showIndex (req,res){
            file.getAllAlbums("path",function(){
                渲染页面
            })
         }
        // showIndex函数的逻辑是，先去获取相册名称数组，再去渲染主页；，“我要先获取数据之后，才能干什么，如同上层安排个命令，自己一层一层向下推：：：：中间领导：小王！你要先做什么，然后接着去做完成什么。中间如果出错了，就直接就去做什么。”
        3.function getAllAlbums (callback){
            ...
            callback(data)
        }
        // getAllAlbums的逻辑时，自己是个异步的，定义时就得有个callback去接收，并且在业务完成之后，去调用回调函数,并将本应return 出去的数据传到回调函数的参数；  这一层就具体实现了 showIndex的逻辑； “小王： 我除了要完成什么，还要接着去完成什么，如果中间有错误，就直接向上级报错”
        //正常的管理，都是这样管的，以及科室生活就是这样；

        }
        */
}   

// 相册页面 
exports.showAlbum = function(req,res){
    res.send("相册"+ req .params.albumName);
}