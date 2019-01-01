var fs=require('fs')

fs.readFile("./public/files/accounts.json",function (err,data) {
    if(!err){
        var json=JSON.parse(data.toString())
        for(var key in json){
            console.log(key)
        }
    }else {
        console.log(err)
    }

})
