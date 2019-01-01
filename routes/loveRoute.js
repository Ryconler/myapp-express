var express = require('express');
var LoveRecords=require('./loveRecords')

var router = express.Router();

router.get('/records',function (req,res) {
    var lr=new LoveRecords()
    var data=lr.readRecords()
    // console.log(data)
    res.render('loveRecords',{data:data})
})
router.post('/postRecords',function (req,res) {
    var content=req.body.content
    var year=req.body.year
    var month=req.body.month
    var day=req.body.day
    var lr=new LoveRecords()
    var result=lr.writeRecords(content,year,month,day)
    // console.log(req.body)
    if(result=="success"){
        res.send("success")
    }else {
        res.send("error")
    }
})


module.exports = router;
