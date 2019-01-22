var mc=require('./MysqlConnect')



function DaoUser() {
    var connection=mc.conn
    this.retrieveUser = function (username, callback) {
        connection.query("SELECT * FROM user WHERE U_USERNAME=?", username, function (err, result) {
            if (err) {
                console.log(err)
                return
            } else {
                // console.log(result)
                callback && callback(result)
            }
        })
    }
    this.createUser = function (username, password, callback) {
        connection.query("INSERT INTO user(U_USERNAME,U_PASSWORD) VALUES (?,?)", [username, password], function (err, result) {
            if (err) {
                console.log(err)
                return
            } else {
                connection.query("CALL CREATEPET(?)",result.insertId,function (err) {
                    if (err) {
                        console.log(err)
                        return
                    }else {
                        callback && callback(result.insertId)
                    }
                })
                connection.query("INSERT INTO friend (U_ID,FRU_ID) VALUES(?,?)",[result.insertId,result.insertId],function (err,result) {
                    if(err){
                        console.log(e)
                        return
                    }
                })
            }
        })

    }
    this.updateUser=function (id,username,password,callback) {
        connection.query("UPDATE user SET U_USERNAME=?,U_PASSWORD=? WHERE U_ID=?"
            ,[username,password,id],function (err,result) {
                if(err){
                    console.log(err)
                    return
                }else {
                    callback && callback("success")
                }
            })
    }
    this.isLogin = function (req,res, callback) {
        var userSession = req.session.user
        var userCookie = req.cookies.user
        if (userSession) {
            console.log("当前用户:"+userSession.username)
            callback && callback("yes")
        } else {
            if (userCookie) {
                this.retrieveUser(userCookie.username, function (result) {
                    if(result.length===0){
                        callback && callback("no")
                    }else {
                        if (result[0].U_PASSWORD === userCookie.password) {
                            req.session.user = {username:result[0].U_USERNAME,id:result[0].U_ID,password:result[0].U_PASSWORD}
                            console.log("当前用户:"+req.session.user.username)
                            callback && callback("yes")
                        } else {
                            // res.render('login')
                            callback && callback("no")
                        }
                    }

                })
            } else {
                callback && callback("no")
            }
        }
    }
    this.isFriendWith=function (u_id,fru_id,callback) {
        connection.query("SELECT * FROM friend WHERE u_id=? AND fru_id=?",[u_id,fru_id],function (err,result) {
            if (err) {
                console.log(err)
                callback && callback("error")
                return
            } else {
                if(result.length!==0){
                    callback && callback("yes")
                }else {
                    callback && callback("no")
                }
            }
        })
    }
    this.retrieveFollowing=function (fer_id,callback) {
        connection.query("SELECT DISTINCT FOLLOWING_ID FROM follow WHERE FOLLOWER_ID=?",[fer_id],function (err,result) {
            if (err) {
                console.log(err)
                return
            } else {
                // console.log(result)
                callback && callback(result)
            }
        })
    }
    this.follow=function (fing_id,fer_id,callback) {
        connection.query("INSERT INTO follow(FOLLOWING_ID,FOLLOWER_ID) VALUES (?,?)",[fing_id,fer_id],function (err,result) {
            if (err) {
                console.log(err)
                return
            } else {
                // console.log(result)
                callback && callback("success")
            }
        })
    }
    this.unfollow=function (fing_id,fer_id,callback) {
        connection.query("DELETE FROM follow WHERE FOLLOWING_ID=? AND FOLLOWER_ID=?",[fing_id,fer_id],function (err,result) {
            if (err) {
                console.log(err)
                return
            } else {
                // console.log(result)
                callback && callback("success")
            }
        })
    }
    this.createFriend=function (u_id,fru_id,callback) {
        connection.query("INSERT INTO friend (U_ID,FRU_ID) VALUES(?,?)",[u_id,fru_id],function (err,result) {
            if(err){
                console.log(e)
                return
            }else {
                callback&&callback("success")
            }
        })
        connection.query("INSERT INTO friend (U_ID,FRU_ID) VALUES(?,?)",[fru_id,u_id],function (err,result) {
            if(err){
                console.log(e)
                return
            }else {
                callback&&callback("success")
            }
        })
    }
    this.deleteFriend=function (u_id,fru_id,callback) {
        connection.query("DELETE FROM friend WHERE U_ID=? AND FRU_ID=?",[u_id,fru_id],function (err,result) {
            if(err){
                console.log(e)
                return
            }else {
                callback&&callback("success")
            }
        })
        connection.query("DELETE FROM friend WHERE U_ID=? AND FRU_ID=?",[fru_id,u_id],function (err,result) {
            if(err){
                console.log(e)
                return
            }else {
                callback&&callback("success")
            }
        })
    }
    this.getFollowNum=function (u_id,callback) {
        //查询关注的人数
        connection.query("SELECT COUNT(*) AS NUM FROM follow WHERE FOLLOWER_ID=?",[u_id],function (err,r1) {
            if(err){
                console.log(err)
                return
            }else {
                //查询被关注的人数
                connection.query("SELECT COUNT(*) AS NUM FROM follow WHERE FOLLOWING_ID=?",[u_id],function (err,r2) {
                    if(err){
                        console.log(err)
                        return
                    }else{
                        if(r1.length!==0&&r2.length!==0){
                            callback&&callback([r1[0].NUM,r2[0].NUM])
                        }else callback&&callback([])
                    }
                })

            }
        })
    }
    this.getFollowings=function (u_id,callback) {
        connection.query(`SELECT U_ID,U_USERNAME FROM user WHERE U_ID IN
            (SELECT FOLLOWING_ID FROM follow WHERE FOLLOWER_ID=?)`,[u_id],function (err,result) {
            if(err){
                console.log(err)
                return
            }else {
                callback&&callback(result)
            }
        })
    }
    this.getFollowers=function (u_id,callback) {
        connection.query(`SELECT U_ID,U_USERNAME FROM user WHERE U_ID IN
            (SELECT FOLLOWER_ID FROM follow WHERE FOLLOWING_ID=?)`,[u_id],function (err,result) {
            if(err){
                console.log(err)
                return
            }else {
                callback&&callback(result)
            }
        })
    }
    this.getFriends=function (u_id,callback) {
        connection.query(`SELECT U_ID,U_USERNAME FROM user WHERE U_ID IN
            (SELECT FRU_ID FROM friend WHERE U_ID=?)`,[u_id],function (err,result) {
            if(err){
                console.log(err)
                return
            }else {
                callback&&callback(result)
            }
        })
    }
}

// new DaoUser().getFollowNum(1)
module.exports = DaoUser
