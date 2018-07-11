var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const opencc = require('../private/javascripts/opencc');
const mobile = require('../private/javascripts/mobile');

/* GET home page. */
router.get('/', function(req, res, next) {
  let ua = req.headers['user-agent'];
  if (mobile.isMobile(ua)) res.render('mobile/index', { title: '主页 - 搞事学园' });
  else res.render('index', { title: '主页 - 搞事学园' });
});

router.get('/equip', function (req, res, next) {
  res.render('equip', { title: '装备模拟器 - 搞事学园' });
});

router.get('/stigmata', function (req, res, next) {
  res.render('stigmata', { title: '圣痕模拟器 - 搞事学园' });
});

router.get('/convert/:conf', (req, res, next) => {
  let conf = req.params.conf;
  if (!req.query.text) res.send('?');
  else {
    let text = req.query.text;
    opencc(text, conf)
      .then(data => { res.send(data) })
      .catch(err => { res.send(err) });
  }
});

router.get('/lotting', function (req, res, next) {
  res.render('lotting', { title: '随机抽签 - 搞事学园' });
});

router.get('/live2d', (req, res, next) => {
  res.render('live2d');
});

module.exports = router;
