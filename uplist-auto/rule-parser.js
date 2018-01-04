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
      // console.log(JSON.stringify(data, null, 2));
      let ruleData = fs.existsSync(getSavePath(pool)) ?
        fs.readFileSync(getSavePath(pool)) : '[]';
      ruleData = JSON.parse(ruleData);
      // console.log(ruleData);
      if (ruleData.constructor === Array) {
        let exist = false;
        ruleData.forEach(item => {
          if (JSON.stringify(item) == JSON.stringify(data)) {
            exist = true;
            console.log(`Data ${data.startTime} already exist.`);
          }
        });
        if(!exist) {
          ruleData.push(data);
          fs.writeFileSync(getSavePath(pool), JSON.stringify(ruleData, null, 2));
          console.log(`Update ${pool} completed.`);
        }
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
      // equips pets
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

function getSavePath(pool) {
  return `./rule-data/${pool}.json`;
}