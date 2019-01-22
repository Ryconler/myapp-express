var express = require('express');
var router = express.Router();
var LoveRecord = require('./DaoLoveRecord')
var User = require('./DaoUser')

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
router.get('/isLogin', function (req, res) {
    var u = new User()
    u.isLogin(req, res, function (result) {
        if (result === "yes") {
            var user = req.session.user
            res.send(user)
        } else {
            res.send("")
        }
    })
})
router.get('/logout', function (req, res) {
    delete req.session.user;
    res.clearCookie("user");
    res.send("success")
})
router.get('/zone', function (req, res) {
    var u = new User()
    u.isLogin(req, res, function (result) {
        if (result === "yes") {
            var lr = new LoveRecord()
            lr.retrieveRecordsByUid(req.session.user.id, function (results) {
                res.render('zone', {data: results, user: req.session.user})
            })
        } else {
            res.render('login')
        }
    })
})
//访问他人空间
router.get('/other/:id', function (req, res) {
    var fru_id = parseInt(req.params.id)
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            //判断是否是自己的空间
            if (fru_id === req.session.user.id) {
                res.redirect("/user/zone")
            } else {
                //判断是否为对方好友
                new User().isFriendWith(req.session.user.id, fru_id, function (r) {
                    if (r === "yes") {   //和对方是好友
                        new LoveRecord().retrieveFriendsRecordsByUid(fru_id, function (results) {
                            res.render('otherzone', {data: results})
                        })
                    } else {
                        new LoveRecord().retrieveUnFriendsRecordsByUid(fru_id, function (results) {
                            res.render('otherzone', {data: results})
                        })
                    }
                })
            }
        } else {
            new LoveRecord().retrieveUnFriendsRecordsByUid(fru_id, function (results) {
                res.render('otherzone', {data: results})
            })
        }
    })
})
//判断我是否关注了某人
router.get('/isFollow/:id', function (req, res) {
    var following_id = parseFloat(req.params.id)
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            //获取我所有的关注人id
            new User().retrieveFollowing(req.session.user.id, function (results) {
                if (results.length !== 0) {
                    var isFollow = false
                    for (var i = 0; i < results.length; i++) {
                        if (following_id === results[i].FOLLOWING_ID) {
                            isFollow = true
                            break
                        }
                    }
                    res.send(isFollow ? "yes" : "no")
                } else {
                    res.send("no")
                }
            })
        } else {
            res.send("noLogin")
        }
    })
})
//关注某人
router.get('/follow/:id', function (req, res) {
    var following_id = parseFloat(req.params.id)
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            var me_id = req.session.user.id
            new User().follow(following_id, me_id, function (result) {
                res.send((result === "success") ? "success" : "error")
            })
            //获取对方所有的关注人id,如果有我，则建立friend
            new User().retrieveFollowing(following_id, function (results) {
                if (results.length !== 0) {
                    for (var i = 0; i < results.length; i++) {
                        if (me_id === results[i].FOLLOWING_ID) {
                            new User().createFriend(me_id, following_id)
                            break
                        }
                    }
                }
            })
        } else {
            res.send("noLogin")
        }
    })
})
//取关某人
router.get('/unfollow/:id', function (req, res) {
    var following_id = parseFloat(req.params.id)
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            new User().unfollow(following_id, req.session.user.id, function (result) {
                res.send((result === "success") ? "success" : "error")
            })
            //有好友则删除好友
            new User().deleteFriend(following_id, req.session.user.id)
        } else {
            res.send("noLogin")
        }
    })
})
//获取我的关注和粉丝数量
router.get('/getMyFollowNum', function (req, res) {
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            new User().getFollowNum(req.session.user.id,function (result) {
                res.send(result)
            })
        } else {
            res.redirect("/user/login")
        }
    })
})
//访问我的关注列表
router.get('/myfollowings',function (req,res) {
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            new User().getFollowings(req.session.user.id,function (results) {
                res.render('followings',{data:results})
            })
        } else {
            res.redirect("/user/login")
        }
    })
})
//访问我的粉丝列表
router.get('/myfollowers',function (req,res) {
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            new User().getFollowers(req.session.user.id,function (results) {
                res.render('followers',{data:results})
            })
        } else {
            res.redirect("/user/login")
        }
    })
})
//访问我的好友列表
router.get('/myfriends',function (req,res) {
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            new User().getFriends(req.session.user.id,function (results) {
                res.render('friends',{data:results,uid:req.session.user.id})
            })
        } else {
            res.redirect("/user/login")
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
        if (result.length !== 0) {
            if (result[0].U_PASSWORD === password) {
                req.session.user = {
                    username: result[0].U_USERNAME,
                    id: result[0].U_ID,
                    password: result[0].U_PASSWORD
                }
                res.cookie("user", {
                    username: result[0].U_USERNAME,
                    id: result[0].U_ID,
                    password: result[0].U_PASSWORD
                })
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
        if (result) {
            req.session.user = {username: username, id: result, password: password}
            res.cookie("user", {username: username, id: result, password: password})
            // console.log(req.cookies)
            res.send("success")
        } else {
            res.send("error")
        }
    })
    // res.send("forbid")
})
router.post('/updateUser', function (req, res) {
    new User().isLogin(req, res, function (result) {
        if (result === "yes") {
            var uid = req.session.user.id
            var username = req.session.user.username
            var password = req.session.user.password
            var updateType = req.body.type
            var updateValue = req.body.value
            var u = new User()
            if (updateType === "username") {  //更改用户名
                //检查用户名是否存在
                u.retrieveUser(updateValue, function (result) {
                    if (result.length === 0) {  //不存在，可以更改
                        u.updateUser(uid, updateValue, password, function (result) {
                            if (result === "success") {
                                delete req.session.user
                                res.clearCookie("user");
                                res.send("success")
                            } else {
                                res.send("error")
                            }
                        })
                    } else {  //存在，不可以更改
                        res.send("existed")
                    }
                })

            } else if (updateType === "password") {  //更改密码
                u.updateUser(uid, username, updateValue, function (result) {
                    if (result === "success") {
                        delete req.session.user
                        res.clearCookie("user");
                        res.send("success")
                    } else {
                        res.send("error")
                    }
                })
            } else {
                res.send("error")
            }
        } else {
            res.render('login')
        }
    })

})
module.exports = router;
