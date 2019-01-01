var express = require('express');
var router = express.Router();

var User = require('./user')

router.get('/login', function (req, res) {

    res.render('login')
})

/* GET users listing. */
router.post('/confirmUser', function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var user = new User()
    var confirmRes = user.confirmUser(username, password)
    if (confirmRes == "success") {
        res.cookie("user",username)
        res.send("confirmSuccess")
    } else if (confirmRes == "incorrect") {
        res.send("incorrect")
    } else if (confirmRes == "nofind") {
        var createRes = user.createUser(username, password)
        if (createRes == "success") {
            res.cookie("user",username)
            res.send("createSuccess")
        }
    } else {
        res.send("error")
    }
})

module.exports = router;
