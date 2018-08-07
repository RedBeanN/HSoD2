const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  res.render('/mobile/gacha', {title: '扭蛋模拟器 - 搞事学园'});
});

router.get('data', (req, res) => {
  const p = path.join(__dirname, '../../gacha/gacha.json');
  fs.readFile(p, (err, data) => {
    if (err) res.send(404, err);
    else res.send(JSON.parse(data));
  });
});
