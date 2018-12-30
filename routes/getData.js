var request = require('request')
var cheerio = require('cheerio')


function GetData() {
    this.getNTU=function () {
        var p = new Promise(function (resolve, reject) {
            var options = {
                url: "http://www.ntu.edu.cn/",
                headers: {
                    'User-Agent': 'request'
                }
            }
            request(options, function (err, res) {
                var ntuData = [
                    {title: "", img: "", url: "", date: ""},
                    {title: "", img: "", url: "", date: ""},
                    {title: "", img: "", url: "", date: ""}]
                var $ = cheerio.load(res.body)
                var title = $("span.title")   //获取所有class="title"的span
                var news
                //筛选出“通大要闻”这一栏
                title.each(function (index) {
                    var text = $(this).text().trim()
                    if (text == "通大要闻") {
                        news = $(this).parents(".tt").next().find("li.news")  //获得所有新闻
                    }
                })
                if (news) {
                    news.each(function (index) {
                        if (index < 3) {
                            ntuData[index].url = $(this).find("a").attr("href")
                            ntuData[index].img = $(this).find("img").attr("src")
                            ntuData[index].title = $(this).find(".news_title").text()
                            ntuData[index].date = $(this).find(".news_meta").text()
                        }
                    })
                    resolve(ntuData)
                }

            })
        })
        return p
    }
    this.getBili=function () {
        var p=new Promise(function (resolve,reject) {
            var options = {
                url: "https://www.bilibili.com/",
                headers: {
                    "Accept": "application/json, text/javascript, */*; q=0.01",
                    "X-Requested-With": "XMLHttpRequest",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }
            request(options, function (err, res) {
                var biliData=[{
                    title: "",
                    img: "",
                    url: "",
                    count: ""
                }, {
                    title: "",
                    img: "",
                    url: "",
                    count: ""
                }, {
                    title: "",
                    img: "",
                    url: "",
                    count: ""
                }]
                var $ = cheerio.load(res.body)
                var videos = $(".groom-module,.home-card")
                videos.each(function (index) {
                    if (index < 3) {
                        biliData[index].url = $(this).find("a").attr("href")
                        biliData[index].img = $(this).find("img").attr("src")
                        biliData[index].title = $(this).find(".title").text()
                        biliData[index].count = $(this).find(".play").text()
                    }
                })
                resolve(biliData)
            })
        })
        return p
    }
}



module.exports=GetData
