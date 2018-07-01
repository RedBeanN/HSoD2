let express = require('express');
let router = express.Router();

let path = require('path');
let fs = require('fs');

router.get('/:time', (req, res) => {
  res.render(
    `worldbattle/${req.params.time}`,
    { title: '阵营战记录 - 搞事学园' }
  );
});

router.get('/:time/:data', (req, res) => {
  fs.readFile(path.join(
    __dirname,
    `../../world battle watcher`,
    `${req.params.time}/${req.params.data}.json`
  ), (err, data) => {
    if (err) res.status(404).send(err);
    else res.send(JSON.parse(data));
  });
});

module.exports = router;