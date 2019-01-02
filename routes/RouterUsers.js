var express = require('express');
var router = express.Router();

var User = require('./DaoUsers')

router.get('/login', function (req, res) {
    var u = new User()
    u.isLogin(req, res, function (result) {
        if (result == "yes") {
            res.redirect("/")
        } else {
            res.render('login')
        }
    })

})

router.get('/logout', function (req, res) {
    delete req.session.user;
    res.clearCookie("user");
})

/* GET users listing. */
router.post('/retrieveUser', function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var u = new User()
    u.retrieveUser(username, function (result) {
        // console.log(result)
        if (result.length != 0) {
            if (result[0].U_PASSWORD == password) {
                req.session.user = {username: username}
                res.cookie("user", {username: username, password: password})
                // console.log(req.cookies)
                res.send("success")
            } else {
                res.send("error")
            }
        } else {
            res.send("empty")
        }
    })
})

router.post('/createUser', function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var u = new User()
    u.createUser(username, password, function (result) {
        if (result == "success") {
            req.session.user = {username: username}
            res.cookie("user", {username: username, password: password})
            res.send("success")
        } else {
            res.send("error")
        }
    })
})

module.exports = router;
