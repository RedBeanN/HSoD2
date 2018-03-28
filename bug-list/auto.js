const http = require('http'),
      fs = require('fs'),
      path = require('path');

const vlist = [
  "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.7.5", "3.8", "3.9",
  "4.0", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9",
  "5.0", "5.1"
];

getAll(vlist);

function getAll (vlist) {
  fs.readFile(path.join(__dirname, 'statics/data.json'), (err, _data) => {
    if (err) console.error(err);
    let all = JSON.parse(_data);
    let v = '5.0';

    function scope (current, list, cb) {
      if (!list[current]) return cb();
      getData(list[current], (err, data) => {
        if (err) console.error(err);
        all[list[current]] = data;
        return scope(current + 1, list, cb);
      });
    }
    scope(0, vlist, () => {
      fs.writeFile(path.join(__dirname, 'statics/data.json'), JSON.stringify(all, null, 2), err => {
        if (err) console.error(err);
      });
    });
  });
}

function getUrl (version) {
  let baseUrl = 'http://event.mihoyo.com/notice/getnews.php?mode=index&v=';
  return baseUrl + version;
}

function getData (version, callback) {
  let url = getUrl(version);
  http.get(url, res => {
    let str = '';
    res.on('data', chunk => {
      str += chunk;
    });
    res.on('end', err => {
      callback(err, JSON.parse(str));
    });
  });
}