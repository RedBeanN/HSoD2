let http = require('http');
let fs = require('fs');

let baseUrl = 'http://event.mihoyo.com/factionWar/';

module.exports = function WBWatcher() {
  // get data and save to data.json
  http.get(baseUrl, res => {
    let data = '';
    res.on('error', err => { console.error(err) });
    res.on('data', chunk => { data += chunk });
    res.on('end', () => {
      // save data
      fs.readFile('./data.json', (err, dt_) => {
        if (err) console.error(err);
        let dt = JSON.parse(dt_);
        let date = getDateString();
        let data_ = JSON.parse(data);
        dt[date] = data_.data;
        fs.writeFile('./data.json', JSON.stringify(dt, null, 2), err => {
          if (err) console.error(err);
        });
      });
    });
  });
  function getDateString() {
    // return a date string formatted as '2018-01-01 00:00'
    let date = new Date();
    let day = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
    let time = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
    return `${day} ${time}`;
  }
  function addZero(num) {
    // add zero for number < 10
    return num > 9 ? num : '0' + +num;
  }
}