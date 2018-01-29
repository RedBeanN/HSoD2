var express = require('express');
var router = express.Router();
var path = require('path');

var fs = require('fs');
var updater = require('../private/javascripts/up-list-updater.js');

// List
router.get('/', function(req, res, next) {
  updater.updateList(function (li) {
    res.render('list', {list: li, title: '装备 up 记录(旧) - 搞事学园'});
  });
  //res.render('list', {list: list, title: '装备 up 记录'});
});

// router.get('/update', function(req, res, next) {
//   res.render('update-list');
// });

// router.post('/', function(req, res, next) {
//   var data = updater.parseUpdate(req.body);
//   if (data.items[0].id == '') res.status(500).send('Error: Empty item list.');
//   else {
//     // updater.list.push(data);
//     updater.updateAllList(data);
//     // updater.updateEquips();
//     res.redirect('/list');
//   }
// });

router.get('/auto', function(req, res, next) {
  // res.render('auto-list', {title: '装备 up 记录 - 搞事学园'});
  fs.readFile(path.join(__dirname, '../public/html/auto-list.html'), (err, data) => {
    if (err) res.status(404).send();
    else res.send(data.toString());
  });
});

router.get('/auto/:pool', function(req, res, next) {
  let path_ = path.join(__dirname, '../../uplist-auto/rule-data/');
  let data = fs.readFileSync(`${path_ + req.params.pool}.json`);
  res.send(JSON.parse(data));
});

module.exports = router;
