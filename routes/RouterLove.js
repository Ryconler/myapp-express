var express = require('express');
var LoveRecord = require('./DaoLoveRecord')
var User = require('./DaoUser')

var router = express.Router();

router.get('/records', function (req, res) {

    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            new LoveRecord().retrieveFriendsRecords(req.session.user.id, function (results) {
                if (results.length !== 0) {
                    res.render('loverecords', {data: results})
                }
            })
        } else {
            new LoveRecord().retrieveRecords(function (results) {
                if (results.length !== 0) {
                    res.render('loverecords', {data: results})
                }
            })
        }
    })

})

router.post('/createRecord', function (req, res) {
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            var content = req.body.content
            var authority = req.body.authority
            var date = new Date()
            var year = date.getFullYear()
            var month = date.getMonth() + 1  //0-11
            var day = date.getDate()
            var publish_date = "" + year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day) + " " + new Date().toLocaleTimeString()
            var u_id = req.session.user.id
            var lr = new LoveRecord()
            lr.createRecord(content, year, month, day, publish_date, authority, u_id, function (result) {
                if (result === "success") {
                    res.send("success")
                } else {
                    res.send("error")
                }
            })
        } else {
            res.send("noLogin")
        }
    })
})
router.post('/updateRecordAuthority', function (req, res) {
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            var id = req.body.id
            var authority = req.body.authority
            new LoveRecord().updateRecordAuthority(authority, id, function (result) {
                if (result === "success") {
                    res.send("success")
                } else {
                    res.send("error")
                }
            })
        } else {
            res.send("noLogin")
        }
    })
})

module.exports = router;
