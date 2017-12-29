const http = require('http');
const fs = require('fs');

const baseUrl = 'http://cms.mihoyo.com/mihoyo/hsod2_gacha_rules/index.php/gacha/';
const server = '?region=3_1';

// never use moe!
const [princess, pri98, mj, special, moe] = ['high', 'middle', 'custom', 'special', 'moe'];

{
  parseUp(princess, (err, data) => {
    if (!err) console.log(JSON.stringify(data, null, 2));
  });
}

function parseUp(type_, cb) {
  http.get(getUrl(type_), res => {
    let data = '';
    let equips = [];
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', err => {
      if (err) console.log(err);
      data = data.toString();
      let date = parseDate(data);
      data = parseGod(data);
      if (!data) cb({message: 'no new item'});
      else {
        data.forEach(i => {
          let tmp = parseEquip(i);
          equips.push(tmp);
        });
        let [startTime, endTime] = [...date.split('至')];
        let up = {startTime, endTime, equips};
        // console.log(up);
        cb(null, up);
      }
    });
  });
}

function getUrl(type_, server_ = server) {
  return baseUrl + type_ + server_;
}

function parseGod(str) {
  let godReg = /(god).*?\/tr/g;
  return str.match(godReg);
}
function parseEquip(str) {
  let equipReg = />.+?</g;
  let tmp = (str.substring(8)).match(equipReg)[0];
  return tmp.substring(1, tmp.length - 1);
}
function parseDate(str) {
  let dateReg = /\d{4}-.*:\d{2}/g;
  return str.match(dateReg)[0];
}
