var express = require('express');
var router = express.Router();
var LoveRecords = require('./DaoLoveRecords')
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
    res.send("success")
})
router.get('/zone',function (req,res) {
    var u=new User()
    u.isLogin(req,res,function (result) {
        if (result == "yes") {
            var lr=new LoveRecords()
            lr.retrieveRecordsByUid(req.session.user.id,function (results) {
                res.render('zone',{data:results,user:req.session.user})
            })
        } else {
            res.render('login')
        }
    })
})

/* 用户增删改查 */
router.post('/retrieveUser', function (req, res) {
    var username = req.body.username
    var password = req.body.password
    var u = new User()
    u.retrieveUser(username, function (result) {
        // console.log(result)
        if (result.length != 0) {
            if (result[0].U_PASSWORD == password) {
                req.session.user = {username:result[0].U_USERNAME,id:result[0].U_ID,password:result[0].U_PASSWORD}
                res.cookie("user", {username:result[0].U_USERNAME,id:result[0].U_ID,password:result[0].U_PASSWORD})
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
    // u.createUser(username, password, function (result) {
    //     if (result == "success") {
    //         req.session.user = {username: username}
    //         res.cookie("user", {username: username, password: password})
    //         res.send("success")
    //     } else {
    //         res.send("error")
    //     }
    // })
    res.send("forbid")
})
router.post('/updateUser',function (req,res) {
    var uid=req.session.user.id
    var username=req.session.user.username
    var password=req.session.user.password
    var updateType=req.body.type
    var updateValue=req.body.value
    var u = new User()
    if(updateType==="username"){  //更改用户名
        //检查用户名是否存在
        u.retrieveUser(updateValue,function (result) {
            if(result.length===0){  //不存在，可以更改
                u.updateUser(uid,updateValue,password,function (result) {
                    if(result==="success"){
                        delete req.session.user
                        res.clearCookie("user");
                        res.send("success")
                    }else {
                        res.send("error")
                    }
                })
            }else {  //存在，不可以更改
                res.send("existed")
            }
        })

    }else if(updateType==="password"){  //更改密码
        u.updateUser(uid,username,updateValue,function (result) {
            if(result==="success"){
                delete req.session.user
                res.clearCookie("user");
                res.send("success")
            }else {
                res.send("error")
            }
        })
    }else {
        res.send("error")
    }
})
module.exports = router;
