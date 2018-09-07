const express  = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  fs.readFile(
    path.join(__dirname, '../public/html/innerWorld.html'),
    {encoding: 'utf-8'},
    (err, data) => {
      if (err) res.status(404).send();
      else res.send(data);
    }
  );
});

router.get('/data/:file', (req, res) => {
  const file = req.params.file;
  const p = path.join(__dirname, '../private/innerWorld/', file + '.json');
  fs.readFile(p, {encoding: 'utf-8'}, (err, data) => {
    if (err) res.sendStatus(404);
    else res.send(JSON.parse(data));
  });
})

router.get('*', (req, res) => {
  res.redirect('/innerWorld');
});

module.exports = router;
