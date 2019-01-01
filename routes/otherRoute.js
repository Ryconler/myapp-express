var express = require('express');
var router = express.Router();

router.get('/deleteBadLuck',function (req,res) {
    console.log(new Date().toLocaleString())
    res.render('deleteBadLuck')
})

module.exports=router
