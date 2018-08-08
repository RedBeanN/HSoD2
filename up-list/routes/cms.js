var express = require('express');
var router = express.Router();
var path = require('path');

var fs = require('fs');

const mobile = require('../private/javascripts/mobile');

// cms
router.get('/', (req, res) => {
  res.render('mobile/cms', {title: '公告备份 - 搞事学园'});
});
router.get('/data/:server', (req, res) => {
  const server = req.params.server;
  fs.readFile(path.join(__dirname, '../../cms-catcher/statics/titles.json'), {encoding: 'utf-8'}, (err, data) => {
    if (err) res.statusCode(404).send();
    else {
      let titles = JSON.parse(data);
      if (titles[server]) res.send(titles[server]);
      else res.send({});
    }
  });
});

router.get('/:server', function(req, res, next) {
  let server = req.params.server;
  var titles = JSON.parse(fs.readFileSync(path.join(__dirname, '../../cms-catcher/statics/titles.json')));
  var arr = [];
  for (var t in titles[server]) {
    arr.push({id: t, title: titles[server][t]});
  }
  arr.sort(function (a, b) {
    var a_ = parseInt(a.id.substring(5));
    var b_ = parseInt(b.id.substring(5));
    return b_ - a_;
  });
  res.render('cms', {titles: arr, title: '公告备份 - 搞事学园', server});
});

router.get('/:server/:id', function(req, res, next) {
  // res.sendfile('public/html/' + req.params.id + '.html');
  var htmlPath = path.join(__dirname, '../../cms-catcher/statics/html/');
  var page = fs.readFileSync(htmlPath + req.params.server + '/' + req.params.id + '.html');
  res.send(page.toString());
});

module.exports = router;
