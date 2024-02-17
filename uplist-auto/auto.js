const http = require('http');
const fs = require('fs');
const path = require('path');

const baseUrl = 'http://cms.benghuai.com/mihoyo/hsod2_gacha_rules/index.php/gacha/';
const server = '?region=3_1';

// never use moe!
const [princess, pri98, mj, special, moe] = ['high', 'middle', 'custom', 'special', 'moe'];

const fourHour = 4 * 60 * 60 * 1000;
setInterval(saveAll, fourHour);
saveAll();

function saveAll() {
  save(princess, err => {
    if (!err) console.log(`Auto update princess completed @ ${Date()}.`);
    save(mj, (err, data) => {
      if (!err) console.log(`Auto update ${data.isPet ? "pet" : "mj"} completed @ ${Date()}.`);
      save(special, err => {
        if (!err) console.log(`Auto update special completed @ ${Date()}.`);
        else console.error(`Auto update special failed @ ${Date()}. ${err.message}`);
      });
    });
  });
}

function save(pool, cb) {
  parseUp(pool, (err, data) => {
    if (!err) {
      // console.log(JSON.stringify(data, null, 2));
      let isPet = false, pets = [];
      if (data.data.constructor === Array) {
        data.data.forEach(i => {
          if (i.indexOf('×30') != -1) {
            isPet = true;
            pets.push(i.substring(0, i.indexOf('×30')));
          }
        });
      }
      if (isPet) {
        delete data.data;
        data.data = pets;
      }
      let pool_ = isPet ? 'pet' : pool;
      let ruleData = fs.existsSync(getSavePath(pool_)) ?
        fs.readFileSync(getSavePath(pool_)) : '[]';
      ruleData = JSON.parse(ruleData);
      // console.log(ruleData);
      let exist = false;
      if (ruleData.constructor === Array) {
        ruleData.forEach(item => {
          if (JSON.stringify(item) == JSON.stringify(data)) {
            exist = true;
            // console.log(`Data ${data.startTime} already exist.`);
          }
        });
        if(!exist) {
          ruleData.push(data);
          fs.writeFileSync(getSavePath(pool_), JSON.stringify(ruleData, null, 2), 'utf8');
          // console.log(`Update ${pool_} completed.`);
        }
      } else console.error('Invalid JSON data!');
      cb(null, {isPet, exist});
    } else cb(err);
  });
}

function getDataFromUrl (url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = Buffer.from('')
      let equips = []
      res.on('data', chunk => {
        // console.log(typeof chunk, chunk instanceof Buffer)
        // data += chunk;
        data = Buffer.concat([data, chunk])
      });
      res.on('end', err => {
        // equips pets
        if (err) console.log(err);
        data = data.toString();
        if (data.indexOf('�') !== -1) {
          // console.log(data.indexOf('�'))
          return reject(new Error('Messy code founded'));
        }
        let date = parseDate(data);
        data = parseGod(data);
        if (!data || !date) {
          // return reject(new Error(`No item was found in ${url}.`));
          return resolve()
        } else {
          data.forEach(i => {
            let tmp = parseEquip(i);
            equips.push(tmp.replace(/\[\d★\]/, ''));
          });
          let [startTime, endTime] = [...date.split('至')];
          let up = {startTime, endTime, data: equips};
          // console.log(up);
          resolve(up);
        }
      });
    })
  })
}

async function parseUp(pool, cb) {
  const all = []
  let startTime, endTime
  for (let i = 0; i < 12; i++) {
    try {
      const rawUrl = getUrl(pool)
      const chooseUrl = rawUrl.includes('?')
          ? rawUrl + `&choose_pool=${i}`
          : rawUrl + `?choose_pool=${i}`
      const data = await getDataFromUrl(chooseUrl)
      if ((data && data.startTime) && (!startTime || (new Date(startTime) > new Date(data.startTime)))) {
        startTime = data.startTime
      }
      if ((data && data.endTime) && (!endTime || (new Date(endTime) < new Date(data.endTime)))) {
        endTime = data.endTime
      }
      if (!data || !data.data || !data.data.length) {
        console.log(`Skip after choosePool=${i}`)
        break
      }
      all.push(...data.data)
    } catch (e) {
      console.warn(`Cannot choose ${i} from pool ${pool}`, e)
      break
    }
  }
  return cb(null, {
    startTime, endTime,
    data: [...new Set(all)]
  })
  http.get(getUrl(pool), res => {
    let data = Buffer.from('');
    let equips = [];
    res.on('data', chunk => {
      // console.log(typeof chunk, chunk instanceof Buffer)
      // data += chunk;
      data = Buffer.concat([data, chunk])
    });
    res.on('end', err => {
      // equips pets
      if (err) console.log(err);
      data = data.toString();
      if (data.indexOf('�') !== -1) {
        // console.log(data.indexOf('�'))
        return cb(new Error('Messy code founded'));
      }
      let date = parseDate(data);
      data = parseGod(data);
      if (!data || !date) cb(new Error(`No item was found in ${pool}.`));
      else {
        data.forEach(i => {
          let tmp = parseEquip(i);
          equips.push(tmp.replace(/\[\d★\]/, ''));
        });
        let [startTime, endTime] = [...date.split('至')];
        let up = {startTime, endTime, data: equips};
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
  return str.match(dateReg) ? str.match(dateReg)[0] : '';
}

function getSavePath(pool) {
  return path.join(__dirname, `./rule-data/${pool}.json`);
}
