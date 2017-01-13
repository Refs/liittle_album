exports.showIndex = function(req,res){
    res.send("我是主页");
}
exports.showAdmin = function(req,res){
    res.send("我是一个动态admin");
}
exports.showAlbum = function(req,res){
    res.send("相册"+ req.params.albumName);
}