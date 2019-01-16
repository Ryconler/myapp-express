var express = require('express');

var User=require('./DaoUser')

var router = express.Router();

router.get('/chatroom',function (req,res) {
    res.render('chatroom')
})
router.get('/me',function (req,res) {
    new User().isLogin(req,res,function (result) {
        if(result==="yes"){
            res.send(req.session.user)
        }else {
            res.redirect("/user/login")
        }
    })
})


module.exports=router
