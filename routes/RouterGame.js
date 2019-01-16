var express = require('express');
var User=require('./DaoUser')

var router = express.Router();

var gamers=[{ },{ }]
var numbers=[[1,1],[1,1]]

router.get('/plus1',function (req,res) {
    new User().isLogin(req,res,function (result) {
        if(result==="yes"){
            var gamer=req.session.user
            for(var i=0;i<2;i++){
                if(JSON.stringify(gamers[i])=== JSON.stringify(gamer)){
                    break
                }
                else if(JSON.stringify(gamers[i])=== "{}"){
                    gamers[i]=gamer
                    break
                }
            }
            console.log(gamers)
            res.render('plus1',{gamers:gamers})
        }else {
            res.redirect("/user/login")
        }
    })
})
router.get('/gamers',function (req,res) {
    res.send(gamers)
})

module.exports=router
