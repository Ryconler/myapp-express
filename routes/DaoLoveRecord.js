var mc = require('./MysqlConnect')


function DaoLoveRecord() {
    var connection = mc.conn

    //未登录时读取
    this.retrieveRecords = function (callback) {
        connection.query(`SELECT user.U_ID,U_USERNAME,LR_CONTENT,LR_CONTENT,LR_YEAR,LR_MONTH,LR_DAY,LR_PUBLISH_DATE
            FROM user JOIN love_record ON user.U_ID=love_record.U_ID
            WHERE LR_AUTHORITY IN("all")
            ORDER BY LR_PUBLISH_DATE DESC `, function (err, results) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return
            } else {
                // console.log(results)
                callback && callback(results)
            }
        });
    }
    //登录后读取
    this.retrieveFriendsRecords = function (u_id,callback) {
        connection.query(`SELECT user.U_ID,U_USERNAME,LR_CONTENT,LR_CONTENT,LR_YEAR,LR_MONTH,LR_DAY,LR_PUBLISH_DATE
            FROM user JOIN love_record ON user.U_ID=love_record.U_ID
            WHERE LR_AUTHORITY IN("all") OR (love_record.U_ID IN
            (SELECT FRU_ID FROM friend WHERE U_ID=?) AND LR_AUTHORITY IN("friend"))
            ORDER BY LR_PUBLISH_DATE DESC`,[u_id], function (err, results) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return
            } else {
                // console.log(results)
                callback && callback(results)
            }
        });
    }
    //读取好友的loverocords
    this.retrieveFriendsRecordsByUid=function (u_id,callback) {
        connection.query(`SELECT * FROM love_record 
        WHERE U_ID=? AND LR_AUTHORITY IN("all","friend")
        ORDER BY LR_PUBLISH_DATE DESC`,[u_id], function (err, results) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return
            } else {
                // console.log(results)
                callback && callback(results)
            }
        });
    }
    //读取非好友的
    this.retrieveUnFriendsRecordsByUid=function (u_id,callback) {
        connection.query(`SELECT * FROM love_record 
        WHERE U_ID=? AND LR_AUTHORITY IN("all")
        ORDER BY LR_PUBLISH_DATE DESC`,[u_id], function (err, results) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return
            } else {
                // console.log(results)
                callback && callback(results)
            }
        });
    }
    //读取本人
    this.retrieveRecordsByUid = function (u_id, callback) {
        connection.query("SELECT * FROM love_record WHERE U_ID=? ORDER BY LR_PUBLISH_DATE DESC", u_id, function (err, results) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return
            } else {
                // console.log(result)
                callback && callback(results)
            }
        })
    }
    this.createRecord = function (content, year, month, day, publish_date,authority, u_id, callback) {
        connection.query('INSERT INTO love_record(LR_CONTENT,LR_YEAR,LR_MONTH,LR_DAY,LR_PUBLISH_DATE,LR_AUTHORITY,U_ID) VALUES(?,?,?,?,?,?,?)', [content, year, month, day, publish_date, authority,u_id], function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                callback && callback("error")
            } else {

                callback && callback("success")
            }
        })

    }
    this.updateRecordAuthority=function (authority,lr_id,callback) {
        connection.query("UPDATE love_record SET LR_AUTHORITY=? WHERE LR_ID=?",[authority,lr_id],function (err,result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return
            } else{
                callback&&callback("success")
            }
        })
    }
}

// new DaoLoveRecord().retrieveFriendsRecords(1)
module.exports = DaoLoveRecord
