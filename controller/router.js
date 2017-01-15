// 首页面
exports.showIndex = function(req,res){
    res.render("index",{
        albums:["aa","bb","cc"] //这个数组是假定的用于测试模板页面的；实际上是通过fs逻辑读取出来的；
    });
}

// 相册页面 
exports.showAlbum = function(req,res){
    res.send("相册"+ req .params.albumName);
}