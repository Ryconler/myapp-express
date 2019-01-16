var express = require('express');

var User=require('./DaoUser')

var router = express.Router();

router.get('/chatroom',function (req,res) {
    res.render('chatroom')
})



module.exports=router
