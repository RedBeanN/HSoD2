const axios = require('axios');
const fs = require('fs');
const path = require('path');
const json = require('./data.json');
const raw = require('./raw.json');

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

function parseData (data) {
  let top = [], round = [];
  let { top_data, round_data } = data;
  if (!top_data || !round_data) console.error('connot find data');

  let current = round_data.current_round - 1;
  let roundData = round_data.details[current];
  if (roundData.round - 1 !== current) console.error('error round');

  top_data.forEach(item => top[item.id - 1] = item.score);
  roundData.faction_data.forEach(item => {
    return round[item.id - 1] = item.score
  });

  return { top, round };
}

function saveRawData(time, data) {
  raw.push({time, data});
  fs.writeFile(
    path.resolve(__dirname, './raw.json'),
    JSON.stringify(raw),
    console.error
  );
}

function watcher () {
  getData().then(data => {
    let _data = {
      time: getFormatedDate(),
      data: parseData(data.data)
    };
    json.push(_data);
    fs.writeFile(
      path.resolve(__dirname,'./data.json'),
      JSON.stringify(json),
      console.error
    )
    // console.log(JSON.stringify(_data, null ,2));
    saveRawData(_data.time, data.data);
  });
}

module.exports = watcher;