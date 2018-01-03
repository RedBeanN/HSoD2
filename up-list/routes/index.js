var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '搞事学园' });
});

router.get('/equip', function (req, res, next) {
  res.render('equip', { title: '模拟器' });
});

module.exports = router;
