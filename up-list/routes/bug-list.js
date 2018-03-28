const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');

router.get('/', (req, res, next) => {
  res.render('bug-list', {title: 'bug 记录 - 搞事学园'});
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
