const axios = require('axios'),
      fs = require('fs'),
      path = require('path');

const json = require('./data.json'),
      raw = require('./raw.json');

const baseUrl = 'http://event.mihoyo.com/activity_api/crossfaction/status';

async function getData (url = baseUrl) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(res => resolve(res.data))
      .catch(reject);
  });
}

function format (n) { return n < 10 ? '0' + n : n.toString() }
function getFormatedDate () {
  let date = new Date();
  let s = format(date.getFullYear()) + '-' +
          format(date.getMonth() + 1) + '-' +
          format(date.getDate()) + ' ' +
          format(date.getHours()) + ':' +
          format(date.getMinutes());
  return s;
}

function parseData (data) {
  const top = [], round = [];
  let { top_data, round_data } = data;
  if (!top_data || !round_data) console.error('connot find data');

  let current = round_data.current_round - 1;
  let roundData = round_data.details[current];
  if (roundData.round - 1 !== current) console.error('error round');

  top_data.forEach(i => top[i.id - 1] = i.score);
  roundData.faction_data.forEach(i => round[i.id - 1] = i.score);

  return { top, round };
}

function saveRawData (time, data) {
  raw.push({time, data});
  fs.writeFile(
    path.resolve(__dirname, './raw.json'),
    JSON.stringify(raw),
    () => {}
  );
}

function watcher () {
  const t = getFormatedDate();
  getData().then(data => {
    let _data = {
      time: t,
      data: parseData(data.data)
    };
    json.push(_data);
    fs.writeFile(
      path.resolve(__dirname,'./data.json'),
      JSON.stringify(json),
      () => {}
    );
    // console.log(JSON.stringify(_data, null ,2));
    saveRawData(t, data.data);
  });
}

module.exports = watcher;