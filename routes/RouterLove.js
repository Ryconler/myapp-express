var express = require('express');
var LoveRecords = require('./DaoLoveRecords')
var User = require('./DaoUsers')

var router = express.Router();

router.get('/records', function (req, res) {
    var u=new User()
    u.isLogin(req,res,function (result) {
        if(result=="yes"){
            var userSession=req.session.user
            var lr = new LoveRecords()
            lr.readRecords(function (results) {
                var data = [{LR_CONTENT: '', LR_YEAR: '', LR_MONTH: '', LR_DAY: ''}]
                if (results) {
                    data = results
                }
                res.render('loveRecords', {data: data,user:userSession})
            })
        }else {
            res.redirect("/users/login")
        }
    })
})
router.post('/postRecords', function (req, res) {
    var content = req.body.content
    var year = req.body.year
    var month = req.body.month
    var day = req.body.day
    var order_date = "" + year + (month < 10 ? "0" + month : month) + (day < 10 ? "0" + day : day)+new Date().toLocaleTimeString()
    var lr = new LoveRecords()
    lr.addRecords(content, year, month, day, order_date, function (result) {
        if (result == "success") {
            res.send("success")
        } else {
            res.send("error")
        }
    })


})

module.exports = router;
