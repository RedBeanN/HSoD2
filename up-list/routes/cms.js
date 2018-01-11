var express = require('express');
var router = express.Router();

var fs = require('fs');

// cms
router.get('/:server', function(req, res, next) {
  let server = req.params.server;
  var titles = JSON.parse(fs.readFileSync('../cms-catcher/statics/titles.json'));
  var arr = [];
  for (var t in titles[server]) {
    arr.push({id: t, title: titles[server][t]});
  }
  arr.sort(function (a, b) {
    var a_ = parseInt(a.id.substring(5));
    var b_ = parseInt(b.id.substring(5));
    return b_ - a_;
  });
  res.render('cms', {titles: arr, title: '公告备份', server});
});

router.get('/:server/:id', function(req, res, next) {
  // res.sendfile('public/html/' + req.params.id + '.html');
  var htmlPath = '../cms-catcher/statics/html/';
  var page = fs.readFileSync(htmlPath + req.params.server + '/' + req.params.id + '.html');
  res.send(page.toString());
});

module.exports = router;
