const axios = require('axios');
const fs = require('fs');
const path = require('path');
const json = require('./data.json');

const baseUrl = 'http://event.mihoyo.com/activity_api/crossfaction/status';

async function getData (url = baseUrl) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function getFormatedDate () {
  function format(n) { return n < 10 ? '0' + n : n.toString() }
  let date = new Date();
  let s = format(date.getFullYear()) + '-' +
          format(date.getMonth() + 1) + '-' +
          format(date.getDate()) + ' ' +
          format(date.getHours()) + ':' +
          format(date.getMinutes());
  return s;
}

function watcher () {
  getData().then(data => {
    let _data = {
      time: getFormatedDate(),
      data: data.data
    };
    json.push(_data);
    fs.writeFileSync(path.resolve(__dirname,'./data.json'), JSON.stringify(json, null, 2))
  });
}

module.exports = watcher;