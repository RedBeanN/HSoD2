let express = require('express');
let router = express.Router();

let path = require('path');
let fs = require('fs');

router.get('/', (req, res) => {
  res.render('worldbattle');
});

router.get('/:data', (req, res) => {
  fs.readFile(path.join(__dirname, `../../world battle watcher/${req.params.data}.json`), (err, data) => {
    if (err) res.status(404).send(err);
    else res.send(JSON.parse(data));
  });
});

module.exports = router;