var router = require("./controller")
var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.use(express.static("./public"))

app.get("/",router.showIndex)

app.get("/:albumName",router.showAlbum)

app.use(function(req,res){
    res.render("err"); //res.render()中的ejs模板名字一定要用string去书写；
})
// 404页面的写法，利用最后的中间件，中间件，能走到这里，说明已经是出错了；

app.listen(3000);



