var fs = require('fs')

function User() {
    this.confirmUser = function (username, password) {
        try {
            var data = fs.readFileSync("./public/files/accounts.json")
            var json = JSON.parse(data.toString())
            for (var key in json) {
                if (username == key) {
                    if (password == json[key]) {
                        return "success"
                    } else {
                        return "incorrect"
                    }
                }
            }
            return "nofind"
        }catch (e) {
            console.log(e)
            return "error"
        }

    }

    this.createUser = function (username,password) {
        try {
            var data = fs.readFileSync("./public/files/accounts.json")
            var json = JSON.parse(data.toString())
            json[username]=password
            fs.writeFileSync("./public/files/accounts.json",JSON.stringify(json))
            return "success"
        }catch (e) {
            console.log(e)
            return "error"
        }
    }
}
// console.log(new User().confirmUser("朱星杰","123"))
module.exports = User
