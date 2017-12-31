const http = require('http');
const fs = require('fs');

const baseUrl = 'http://cms.mihoyo.com/mihoyo/hsod2_gacha_rules/index.php/gacha/';
const server = '?region=3_1';

// never use moe!
const [princess, pri98, mj, special, moe] = ['high', 'middle', 'custom', 'special', 'moe'];

save();
save(mj);

function save(pool = princess) {
  parseUp(pool, (err, data) => {
    if (!err) {
      console.log(JSON.stringify(data, null, 2));
      let ruleData = fs.readFileSync(`./rule-data.${pool}.json`);
      ruleData = JSON.parse(ruleData);
      console.log(ruleData);
      if (ruleData.constuctor != Array) {
        ruleData.push(data);
        fs.writeFileSync(`./rule-data.${pool}.json`, JSON.stringify(ruleData, null, 2));
      } else console.error('Invalid JSON data!');
    }
  });
}

function parseUp(pool, cb) {
  http.get(getUrl(pool), res => {
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

function getUrl(pool, server_ = server) {
  return baseUrl + pool + server_;
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
