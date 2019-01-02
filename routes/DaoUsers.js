var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myapp'
});
connection.connect();

function DaoUsers() {
    this.retrieveUser = function (username, callback) {
        connection.query("SELECT * FROM user WHERE U_USERNAME=?", username, function (err, result) {
            if (err) {
                console.log(err)
                return
            } else {
                // console.log(result[0].U_PASSWORD)
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
                // console.log(result)
                callback && callback("success")
            }
        })
    }

    this.isLogin = function (req,res, callback) {
        var userSession = req.session.user
        var userCookie = req.cookies.user
        if (userSession) {
            console.log(userSession)
            callback && callback("yes")
        } else {
            if (userCookie) {
                this.retrieveUser(userCookie.username, function (result) {
                    if (result[0].U_PASSWORD === userCookie.password) {
                        req.session.user = {username: userCookie.username}
                        console.log(userSession)
                        callback && callback("yes")
                    } else {
                        // res.render('login')
                        callback && callback("no")
                    }
                })
            } else {
                callback && callback("no")
            }
        }


    }
}

// new DaoUsers().retrieveUser("朱星杰")
module.exports = DaoUsers
