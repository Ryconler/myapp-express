var express=require("express")
var router=express.Router()

router.get("/",function (req,res) {
    res.render("games/appindex.html")
})


module.exports=router