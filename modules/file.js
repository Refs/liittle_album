
var fs = require("fs");

exports.getAllAlbums = function(callback){
    //   return ["小狗","小猫"] 只要函数返回一个数组，则模板文件，就能够，正确渲染；
    // 集中精力，写这一块逻辑，真的可以将文件夹名称读取出来，并放在一个数组中；这就是mvc的实际意义了，可以集中精力，写这一块的逻辑；
   fs.readdir("./uploads",function(err,files){//fs中的路径，都是相对于工作空间根目录的路径；
       if(err){
           callback(err,null)
       }
       var albums = []; //函数要返回的文件夹；
       (function iterator(i){
           if(i == files.length){
               console.log(albums);
               callback(null,albums);
            //    console.log(albums);//将最终迭代结果，打印出来，看一下；
               return ;//此时就能够读取真实的相册名称，并将相册名称数组返回，至router.js中的getAllAlbums函数中；
           }
           fs.stat("./uploads/"+files[i],function(err,stats){
               if(err){throw err};
               if(stats.isDirectory()){
                    albums.push(files[i]);
               }
              iterator(i+1);
           })
       })(0);
   })
}