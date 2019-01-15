var express = require('express');
var LoveRecord = require('./DaoLoveRecord')
var User = require('./DaoUser')

var router = express.Router();

router.get('/records', function (req, res) {
    var u = new User()
    u.isLogin(req, res, function (result) {
        if (result === "yes") {
            var userSession = req.session.user
            var lr = new LoveRecord()
            lr.retrieveRecords(function (results) {
                var data = [{LR_CONTENT: '', LR_YEAR: '', LR_MONTH: '', LR_DAY: ''}]
                if (results) {
                    data = results
                }
                res.render('loverecords', {data: data, user: userSession})
            })
        } else {
            res.redirect("/user/login")
        }
    })
})

router.post('/createRecord', function (req, res) {
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            var content = req.body.content
            var year = req.body.year
            var month = req.body.month
            var day = req.body.day
            var order_date = "" + year + (month < 10 ? "0" + month : month) + (day < 10 ? "0" + day : day) + new Date().toLocaleTimeString()
            var u_id = req.session.user.id
            var lr = new LoveRecord()
            lr.createRecord(content, year, month, day, order_date, u_id, function (result) {
                if (result == "success") {
                    res.send("success")
                } else {
                    res.send("error")
                }
            })

        } else {
            res.redirect("/user/login")
        }
    })
})

module.exports = router;
