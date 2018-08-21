const http = require('http'),
      fs = require('fs'),
      path = require('path');

const halfHour = 60 * 1000;
let currentVersions = [];

getAll(getVersions());
getCurrentVersions();
setInterval(() => { getAll(getCurrentVersions()) }, halfHour);

function getAll (vlist) {
  fs.readFile(path.join(__dirname, 'statics/data.json'), (err, _data) => {
    if (err) console.error(err);
    let all = JSON.parse(_data);

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

function getVersions () {
  return JSON.parse(fs.readFileSync(path.join(__dirname, 'statics/versions.json')));
}

function getCurrentVersions () {
  fs.readFile(path.join(__dirname, 'statics/versions.json'), (err, data) => {
    if (err) console.error(err);
    if (Array.isArray(data)) currentVersions = [data[1], data[0]];
    else {
      let arr = JSON.parse(data);
      if (Array.isArray(arr)) currentVersions = [arr[1], arr[0]];
    }
  });
  return currentVersions;
}
