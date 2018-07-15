const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

const mobile = require('../private/javascripts/mobile');

router.get('/', (req, res, next) => {
  let ua = req.headers['user-agent'];
  if (mobile.isMobile(ua)) res.render('mobile/buglist', { title: 'bug 记录 - 搞事学园' });
  else res.render('bug-list', {title: 'bug 记录 - 搞事学园'});
});

router.get('/data', (req, res, next) => {
  fs.readFile(path.join(__dirname, '../../bug-list/statics/data.json'), (err, data) => {
    if (err) res.send(404, err.message);
    else res.send(JSON.parse(data));
  });
});

router.get('/data/:version', (req, res, next) => {
  let ver = req.params.version;
  fs.readFile(path.join(__dirname, '../../bug-list/statics/data.json'), (err, data) => {
    if (err) res.send(404, err.message);
    else {
      data = JSON.parse(data);
      if (data[ver]) res.send(data[ver]);
      else res.send(404, 'cannot find version ' + ver);
    }
  });
});

router.get('/versions', (req, res, next) => {
  fs.readFile(path.join(__dirname, '../../bug-list/statics/versions.json'), (err, data) => {
    if (err) res.send(404, err.message);
    else res.send(data);
  })
});

module.exports = router;