
var file = require("./../modules/file");
// 首页面
exports.showIndex = function(req,res){
        file.getAllAlbums(function(err,albums){
           if(err){
               res.send("找不到该页面")
           }
            res.render("index",{
                albums:albums
            })
        })
}   

//理解层面一：： 相册页面  ===明白要获取的数据形式images:["/小狗/1.jpg","/小狗/2.jpg"]
// exports.showAlbum = function(req,res){
//     // 逻辑1遍历指定相册（根据前面app.use中设计的路由指定相册就是指req.params.albumName）中的所有图片；
//     var albumName = req.params.albumName;
//     // 具体业务 交给模块 modules去处理；获取图片信息后，去渲染album模板；
//     res.render("album",{
//         albumname:albumName,
//         images:["/小狗/1.jpg","/小狗/2.jpg"]
//         //作为一个领导，要明白，进行下一层业务之前，自己要获取的数据是什么样的；images:["/小狗/1.jpg","/小狗/2.jpg"]
//     })
// } 

/*------------------------------------------------重点总结
     渲染页面是在控制层（controller）去render; 控制层数据的获取是在模块层(modules)中去获取，
     在进入modules层之前，可以利用假定数据，在控制层render试一试，以便可以明确自己想要的数据形式，
     以及辨别视图层views是否工作正常； 

     即controller层，上面的领导是图层，下面的小兵是模块层；调动小兵(调用模块函数)去获取字典数据；将数据反馈上级视图层（返回渲染视图res.render("views",{dictionary})）
---------------------------------------------------*/

// 相册页面（承上启下的控制层）,

// 根据所要的数据形式images:["/小狗/1.jpg","/小狗/2.jpg"]，肯定需要一个函数，去获取指定相册目录下的图片，并将图片的链接，以上面既定的形式放到数组images中；这是一个i/o过程，


/*---------重点规律-
在modules层执行i/o的函数肯定是异步的；按照node的异步编程逻辑，这个异步函数要有一个callback参数，以便接收controller层传入的回调函数 ***(modules干完自己的活之后，还要把领导的活干喽)****；

回调函数中要有一个参数err，i/o遇到错误，err也是一种i/o的结果，
回调函数中还要有一个参数data，可以承接正常i/o的数据的结果,
自己的工作有了结果之后，下一步就是利用这些结果去 做领导的活；

即controller层在调用modules让其i/o数据时，一般要传入一个回调函数，告诉其i/o之后，要做什么；回调函数要能接收两个参数err,data 分别对应假如 i/o过程中出错，你紧接着要做什么，与顺利得到i/o结果之后，紧接着要做什么；这是一个固定的套路；形式如下：
    var file =require("./../modules/file");

    file.fn1([option],function(err,data){  //fn1为modules目录下file.js文件暴露的函数；
        紧接着要做的事；
        if(err){
            next();
            return;
        }
    })

-------------------------------------
还未进入modules层，相册都应该具体到如下的样子，上面安排的越是具体，下面的活越好干；
实际上如下：控制层就写好了；
exports.showAlbum = function(req,res,next){
    var albumname = req.params.albumName;
    file.getAllImagesByAlbumName(albumname,function(err,images,next){
        if(err){
            next();
            return;
        }
        res.render("album",{
        albumname:albumname,
        images:images
    })
    })
}
-------------------------*/ 
// 相册页面
exports.showAlbum = function(req,res,next){
    var albumname = req.params.albumName;
    file.getAllImagesByAlbumName(albumname,function(err,images){
        console.log(albumname);
        if(err){
            next();
            return;
        }
        res.render("album",{
            albumname:albumname,
            images:images
        })
    })
}