var express = require('express');
var GetData = require('./getData')

var router = express.Router();

/* GET home page. */
router.get('/mindex', function (req, res) {
    res.render('mindex');

});
router.get('/', async function (req, res) {
        var data = {
            ntu: [],
            bili: []
        }
        var getData = new GetData()
        data.ntu = await getData.getNTU()
        data.bili = await getData.getBili()
        res.render('pindex', data)
    }
);

module.exports = router;
