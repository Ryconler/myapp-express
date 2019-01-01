var express = require('express');
var router = express.Router();
var GetData = require('./getData')

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
router.get('/', async function (req, res) {
        console.log(new Date().toLocaleString())
        if (firstFlag) {  //是第一次访问，获得新数据
            var getData = new GetData()
            data.ntu = await getData.getNTU()
            data.bili = await getData.getBili()
            firstFlag = false
            setTimeout(function () {
                firstFlag = true
            }, 1000 * 600)   //十分钟后刷新
            console.log(data)
        }
        res.render('appindex', data)
    }
);

module.exports = router;
