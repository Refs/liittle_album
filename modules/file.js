
var fs = require("fs");

exports.getAllAlbums = function(callback){

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
               return ;
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