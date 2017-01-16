
var file = require("./../modules/file");
// require 去引自己想要的包；直接ctrl + shift + H 调用relative path插件就可以了； 

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

// 相册页面 
exports.showAlbum = function(req,res){
    res.send("相册"+ req .params.albumName);
}