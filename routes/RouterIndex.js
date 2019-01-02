var express = require('express');
var router = express.Router();
var GetData = require('./DaoIndexData')

var data = {
    ntu: [{title: "", img: "", url: "", date: ""},
        {title: "", img: "", url: "", date: ""},
        {title: "", img: "", url: "", date: ""}],

    bili: [
        {title: "", img: "", url: "", count: ""},
        {title: "", img: "", url: "", count: ""},
        {title: "", img: "", url: "", count: ""}]
}
var firstFlag = true  //是否第一次访问
/* GET home page. */
router.get('/',function (req, res) {
        if (firstFlag) {  //是第一次访问，获得新数据
            firstFlag = false
            var getData = new GetData()
            getData.getNTU(function (ntuData) {
                getData.getBili(function (biliData) {
                    data.ntu=ntuData
                    data.bili=biliData
                    res.render('appindex', data)
                })
            })
            setTimeout(function () {
                firstFlag = true
            }, 1000 * 600)   //十分钟后刷新
            // console.log(data)
        }else{
            res.render('appindex', data)
        }
    }
);

module.exports = router;
