var express = require('express');
var router = express.Router();

var fs = require('fs');

var updater = require('../public/javascripts/up-list-updater.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '搞事学园' });
});

// List
router.get('/list', function(req, res, next) {
  updater.updateList(function (li) {
    res.render('list', {list: li, title: '装备 up 记录'});
  });
  //res.render('list', {list: list, title: '装备 up 记录'});
});

router.get('/list/update', function(req, res, next) {
  res.render('update-list');
});

router.post('/list', function(req, res, next) {
  var data = updater.parseUpdate(req.body);
  if (data.items[0].id == '') res.status(500).send('Error: Empty item list.');
  else {
    // updater.list.push(data);
    updater.updateAllList(data);
    // updater.updateEquips();
    res.redirect('/list');
  }
});

router.delete('/list/:id', function(req, res, next) {
  // identify
  // updater.delete(req.body.id);
  // res.redirect('/list');
});

// cms
router.get('/cms', function(req, res, next) {
  var titles = JSON.parse(fs.readFileSync('../cms-catcher/statics/titles.json'));
  var arr = [];
  for (var t in titles) {
    arr.push({id: t, title: titles[t]});
  }
  arr.sort(function (a, b) {
    var a_ = parseInt(a.id.substring(5));
    var b_ = parseInt(b.id.substring(5));
    return b_ - a_;
  });
  res.render('cms', {titles: arr, title: '公告备份'});
});

router.get('/cms/:id', function(req, res, next) {
  res.sendfile('public/html/' + req.params.id + '.html');
})

module.exports = router;
