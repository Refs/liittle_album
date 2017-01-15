var router = require("./controller")
var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.use(express.s tatic("./public"))

app.get("/",router.showIndex)

app.get("/:albumName",router.showAlbum)

app.listen(3000);



