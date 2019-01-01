var express = require('express');
var router = express.Router();

router.get('/deleteBadLuck',function (req,res) {
    res.render('deleteBadLuck')
})

module.exports=router
