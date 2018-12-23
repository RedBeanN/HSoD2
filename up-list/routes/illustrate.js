const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  res.render('mobile/illustrate', {title: '装备图鉴 - 搞事学园'});
});

router.get('/data/:size', (req, res) => {
  const size = req.params.size;
  fs.readFile(path.join(__dirname, `../../equip/${size}.json`), (err, data) => {
    if (err) res.status(404).send();
    else res.json(JSON.parse(data));
  });
});

router.get('/details/:id', (req, res, next) => {
  const id = req.params.id;
  fs.readFile(path.join(__dirname, '../../equip/sorted.json'), (err, data) => {
    if (err) next();
    else {
      data = JSON.parse(data);
      // let exist = false;
      // if (data) {
      //   for (let i of data) {
      //     if (i.display_image && i.display_image === id) {
      //       exist = true;
      //       res.send(i);
      //     }
      //   }
      // }
      // if (!exist) next();
      fs.readFile(path.join(__dirname, '../../equip/sortmap.json'), (err, map) => {
        map = JSON.parse(map);
        const result = data[map[id]];
        if (result) res.send(result);
        else next();
      });
    }
  });
});

module.exports = router;
