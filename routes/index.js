var express = require('express');
var data=require('./getData')

var router = express.Router();

/* GET home page. */
router.get('/mindex', function(req, res) {
  res.render('mindex');

});
router.get('/', function(req, res) {
    res.render('pindex',data);
});



module.exports = router;
