var express = require('express');


var router = express.Router();

/* GET home page. */
router.get('/mindex', function(req, res) {
  res.render('mindex');

});
router.get('/', function(req, res) {

    res.render('pindex');
});



module.exports = router;
