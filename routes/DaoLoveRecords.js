var mc=require('./MysqlConnect')


function daoLoveRecords() {
    var connection=mc.conn

    this.retrieveRecords = function (callback) {
        connection.query('SELECT * FROM love_record ORDER BY LR_ORDER_DATE DESC', function (err, results) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return
            } else {
                // console.log(results)
                callback && callback(results)
            }
        });
    }
    this.retrieveRecordsByUid=function (u_id,callback) {
        connection.query("SELECT * FROM love_record WHERE U_ID=? ORDER BY LR_ORDER_DATE DESC",u_id,function (err,results) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return
            } else {
                // console.log(result)
                callback && callback(results)
            }
        })
    }
    this.createRecords = function (content, year, month, day, order_date,u_id, callback) {
        connection.query('INSERT INTO love_record(LR_CONTENT,LR_YEAR,LR_MONTH,LR_DAY,LR_ORDER_DATE,U_ID) VALUES(?,?,?,?,?,?)', [content, year, month, day, order_date,u_id], function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                callback&&callback("error")
            }else {
                callback&&callback("success")
            }
        })

    }

}

// new daoLoveRecords().retrieveRecordsByUid(1)
module.exports = daoLoveRecords
