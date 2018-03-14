var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '主页 - 搞事学园' });
});

router.get('/equip', function (req, res, next) {
  res.render('equip', { title: '装备模拟器 - 搞事学园' });
  // fs.readFile(path.join(__dirname, '../public/html/equip.html'), (err, data) => {
  //   if (err) res.statusCode(404).send(err);
  //   else res.send(data.toString());
  // });
});

router.get('/stigmata', function (req, res, next) {
  res.render('stigmata', { title: '圣痕模拟器 - 搞事学园' });
});

module.exports = router;
