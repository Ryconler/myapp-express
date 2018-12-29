var request = require('request')
var cheerio = require('cheerio')

var data = {
    ntu: [{
        title: "",
        img: "",
        url: "",
        date:""
    }, {
        title: "",
        img: "",
        url: "",
        date:""
    }, {
        title: "",
        img: "",
        url: "",
        date:""
    }],

    bili:[{
        title: "",
        img: "",
        url: "",
        count:""
    },{
        title: "",
        img: "",
        url: "",
        count:""
    },{
        title: "",
        img: "",
        url: "",
        count:""
    }]
}

function getNTU(){
    var options = {
        url: "http://www.ntu.edu.cn/",
        headers: {
            'User-Agent': 'request'
        }
    }
    request(options, function (err, res) {
        var $ = cheerio.load(res.body)
        var title = $("span.title")   //获取所有class="title"的span
        var news
        //筛选出“通大要闻”这一栏
        title.each(function (index) {
            var text = $(this).text().trim()
            if (text == "通大要闻") {
                news=$(this).parents(".tt").next().find("li.news")  //获得所有新闻
            }
        })
        if(news){
            news.each(function (index) {
                if(index<3){
                    data.ntu[index].url=$(this).find("a").attr("href")
                    data.ntu[index].img=$(this).find("img").attr("src")
                    data.ntu[index].title=$(this).find(".news_title").text()
                    data.ntu[index].date=$(this).find(".news_meta").text()
                }
            })
        }
    })
}
function getBili(){
    var options = {
        url: "https://www.bilibili.com/",
        headers: {
            'User-Agent': 'request'
        }
    }
    request(options,function (err,res) {
        var $=cheerio.load(res.body)
        var videos=$(".groom-module,.home-card")
        videos.each(function (index) {
            if(index<3){
                data.bili[index].url=$(this).find("a").attr("href")
                data.bili[index].img=$(this).find("img").attr("src")
                data.bili[index].title=$(this).find(".title").text()
                data.bili[index].count=$(this).find(".play").text()
            }
        })
        console.log(data)
    })
}

getNTU()
getBili()

module.exports=data
