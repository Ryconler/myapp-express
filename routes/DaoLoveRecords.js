var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myapp'
});

connection.connect();

function daoLoveRecords() {
    this.readRecords = function (callback) {
        connection.query('SELECT * FROM love_record ORDER BY LR_ORDER_DATE DESC', function (err, results) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                callback && callback()
            } else {
                // console.log(results)
                callback && callback(results)
            }
        });
    }

    this.addRecords = function (content, year, month, day, order_date, callback) {
        connection.query('INSERT INTO love_record(LR_CONTENT,LR_YEAR,LR_MONTH,LR_DAY,LR_ORDER_DATE) VALUES(?,?,?,?,?)', [content, year, month, day, order_date], function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                callback&&callback("error")
            }else {
                callback&&callback("success")
            }
        })

    }
}

// new daoLoveRecords().readRecords()
module.exports = daoLoveRecords
