var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '主页 - 搞事学园' });
});

router.get('/equip', function (req, res, next) {
  res.render('equip', { title: '装备模拟器 - 搞事学园' });
});

module.exports = router;
