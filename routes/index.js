var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');

});
router.get('/newindex', function(req, res) {
    res.render('newindex');

});


module.exports = router;
