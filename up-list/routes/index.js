var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const opencc = require('../private/javascripts/opencc');
const mobile = require('../private/javascripts/mobile');

/* GET home page. */
router.get('/', function(req, res, next) {
  // let ua = req.headers['user-agent'];
  // if (mobile.isMobile(ua)) res.render('mobile/index', { title: '主页 - 搞事学园' });
  // else res.render('index', { title: '主页 - 搞事学园' });
  res.render('mobile/index', { title: '主页 - 搞事学园 - 《崩坏学园2》非官方数据站' });
});
router.get('/calendar', function(req, res, next) {
  res.render('mobile/calendar', { title: '崩坏课程表 - 搞事学园' });
});

router.get('/equip', function (req, res, next) {
  // res.render('equip', { title: '装备模拟器 - 搞事学园' });
  // fs.readFile(
  //   path.join(__dirname, '../public/html/equip.html'),
  //   {encoding: 'utf-8'},
  //   (err, data) => {
  //     if (err) res.status(404).send();
  //     else res.send(data);
  //   }
  // );
  res.render('mobile/template', {
    title: '装备图鉴 - 搞事学园',
    css: 'equip',
    js: 'equip',
    jsVendor: 'equip.vendors',
  });
});
router.get('/spine-viewer', (req, res, next) => {
  res.render('mobile/template', {
    title: '动态看板查看器 - 搞事学园',
    css: 'spine-viewer',
    js: 'spine-viewer',
    jsVendor: 'spine-viewer.chunk',
    injectedLibs: ['spine-widget'],
  });
});
router.get('/community', (req, res, next) => {
  res.render('mobile/template', {
    title: '社团助手 - 搞事学园',
    css: 'community',
    cssVendor: 'community.chunk',
    js: 'community',
    jsVendor: 'community.chunk',
  });
});
router.get('/DLC', function (req, res, next) {
  // res.render('DLC', { title: '装备模拟器 - 搞事学园' });
  fs.readFile(
    path.join(__dirname, '../public/html/DLC.html'),
    {encoding: 'utf-8'},
    (err, data) => {
      if (err) res.status(404).send();
      else res.send(data);
    }
  );
});

router.get('/talent/data', (req, res, next) => {
  fs.readFile(
    path.resolve(__dirname, '../public/data/talent.json'),
    (err, data) => {
      if (err) next(err);
      else res.send(data);
    }
  )
});
router.get('/talent/sprite', (req, res, next) => {
  fs.readFile(
    path.resolve(__dirname, '../public/data/talent-sprite.json'),
    (err, data) => {
      if (err) next(err);
      else res.send(data);
    }
  )
});
router.get('/talent', function (req, res, next) {
  res.render('mobile/talent', { title: '圣痕一览 - 搞事学园' });
});
router.get('/roguelike', function (req, res, next) {
  res.render('mobile/roguelike', { title: '伽蓝之末排名 - 搞事学园' });
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

router.get('/pet-run', (req, res) => {
  res.render('mobile/pet-run', { title: '使魔Formula - 搞事学园' });
});

module.exports = router;
