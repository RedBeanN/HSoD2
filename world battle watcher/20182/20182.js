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

function parseData (data) {
  let top = [], round = [];
  let {top_data, round_data} = data;
  if (!top_data || !round_data) console.error('connot find data');
  let current = round_data.current_round - 1;
  top_data.forEach(item => top[item.id - 1] = item.score);
  let roundData = round_data.details[current];
  if (roundData.round - 1 !== current) console.error('error round');
  roundData.faction_data.forEach(item => round[item.id - 1] = item.score);
  return {top, round};
}

function watcher () {
  getData().then(data => {
    let _data = {
      time: getFormatedDate(),
      data: parseData(data.data)
    };
    json.push(_data);
    fs.writeFileSync(path.resolve(__dirname,'./data.json'), JSON.stringify(json))
    // console.log(JSON.stringify(_data, null ,2));
  });
}

module.exports = watcher;