var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('mindex');

});
router.get('/pindex', function(req, res) {
    res.render('pindex');

});


module.exports = router;
