var express = require('express');
var router = express.Router();

var fs = require('fs');
var updater = require('../public/javascripts/up-list-updater.js');

// List
router.get('/', function(req, res, next) {
  updater.updateList(function (li) {
    res.render('list', {list: li, title: '装备 up 记录'});
  });
  //res.render('list', {list: list, title: '装备 up 记录'});
});

router.get('/update', function(req, res, next) {
  res.render('update-list');
});

router.post('/', function(req, res, next) {
  var data = updater.parseUpdate(req.body);
  if (data.items[0].id == '') res.status(500).send('Error: Empty item list.');
  else {
    // updater.list.push(data);
    updater.updateAllList(data);
    // updater.updateEquips();
    res.redirect('/list');
  }
});

router.delete('/:id', function(req, res, next) {
  // identify
  // updater.delete(req.body.id);
  // res.redirect('/list');
});

module.exports = router;
