var fs = require('fs')

function loverecords() {

    this.readRecords = function () {
        var json={}
        try {
            var data = fs.readFileSync("./public/files/loveRecords.json")
            json = JSON.parse(data.toString())
            json
        }catch (e) {
            console.log(e)
        }
        return json
    }

    this.writeRecords = function (cnt,y,m,d) {
        var newRecord={content:cnt,year:y,month:m,day:d}
        try {
            var data = fs.readFileSync("./public/files/loveRecords.json")
            json = JSON.parse(data.toString())
            json.unshift(newRecord)
            fs.writeFileSync("./public/files/loveRecords.json",JSON.stringify(json))
            return "success"
        }catch (e) {
            console.log(e)
            return "error"
        }
    }
}
// console.log(new User().confirmUser("朱星杰","123"))
module.exports = loverecords
