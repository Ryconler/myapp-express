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
}

// new DaoUser().createUser("12345678901","123")
module.exports = DaoUser
