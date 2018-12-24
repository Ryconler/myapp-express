var request = require('request');
var cheerio = require('cheerio');
var http = require('http')
var url = require('url');
var fs = require('fs');
var path=require('path')

var count=0
var urlArr = new Array()

function saveImg(url) {
    try {
        http.get(url, function (res) {
            count++
            res.pipe(fs.createWriteStream("C:\\Users\\Jesse\\Desktop\\imgs\\"+count+".png"));
        })
    }catch (e) {

    }
    console.log(url)
}
request('https://www.bilibili.com/', function (error, response, body) {
    var $ = cheerio.load(body)
    $("img").each(function (index) {
        var src = $(this).attr('src')
        var protocol = ""
        try {
            protocol = url.parse(src).protocol.toString()
        } catch (e) {

        }
        if (protocol != "") {
            saveImg(src)
        } else {
            saveImg("http:"+src)
        }

    })

})





