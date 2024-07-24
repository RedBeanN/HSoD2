const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = `http://cms.benghuai.com/mihoyo/hsod2_gacha_rules/index.php/gacha/`;
const tail = `?region=3_1`;

const pools = ['high', 'custom', 'special', 'festival'];

const getUpSingleData = async url => {
  // console.log(url)
  const { data } = await axios.get(url);
  const $ = cheerio.load(data, { decodeEntities: false });
  const times = data.toString().match(/\d{4}-.*:\d{2}/g);
  if (!times) return null;
  const time = times[times.length - 1];
  const [startTime, endTime] = time.split('至');
  const list = [];
  const rows = []
  $(`table tbody tr`).each((index, ele) => {
    const tbs = []
    $(ele).children().each((index, child) => {
      tbs.push($(child).text())
    })
    rows.push(tbs)
    const isGod = $(ele).hasClass('god');
    const obj = { isGod };
    $(ele).children().each((index, ele) => {
      if (index < 2) {
        const key = index ? 'type' : 'name';
        obj[key] = $(ele).text();
      }
    });
    list.push(obj);
  });
  const isCustomSelect = rows.some(row => {
    return row.includes('自选装备')
  })
  let index = rows.length
  const finalData = isCustomSelect
    ? rows.filter((r, i) => {
      if (r[1] === '武器' || r[1] === '服装' || r[1] === '徽章') {
        if (i < index) return true
      }
      if (r[1] === '自选装备' && index > i) {
        index = i
      }
      return false
    }).map(i => i[0].replace(/\[\d★\]/, ''))
    : list.filter(i => i.isGod).map(i => i.name.replace(/\[\d★\]/, ''))
  const upData = {
    startTime,
    endTime,
    // data: list.filter(i => i.isGod).map(i => i.name.replace(/\[\d★\]/, '')),
    data: finalData,
    // rows,
  };
  return upData;
};
const getUpData = async pool => {
  let startTime, endTime
  const all = []
  for (let i = 0; i < 12; i++) {
    const url = `${baseUrl}${pool}${tail}&choose_pool=${i}`
    const resp = await getUpSingleData(url)
    if (!resp) {
      console.log('Got empty data', resp, pool)
      break
    }
    if (!resp.data || !resp.data.length) {
      console.log('Got empty ups', pool)
      break
    }
    if (!startTime || (new Date(startTime) > new Date(resp.startTime))) {
      startTime = resp.startTime
    }
    if (!endTime || (new Date(endTime)) < new Date(resp.endTime)) {
      endTime = resp.endTime
    }
    all.push(...resp.data)
  }
  if (!all.length) return null
  return {
    startTime, endTime,
    data: [...new Set(all)]
  }
}

const save = async pool => {
  const upData = await getUpData(pool);
  if (!upData) {
    return false;
  }
  let _pool = pool;
  let isPet = false;
  upData.data.forEach(d => {
    if (d.endsWith(`×30`)) isPet = true;
  });
  if (isPet) {
    _pool = `pet`;
    upData.data = [...new Set(upData.data.map(i => i.replace(/×\d+/, '')))];
  }
  const poolPath = path.resolve(__dirname, `rule-data/${_pool}.json`);
  if (!fs.existsSync(poolPath)) {
    fs.writeFileSync(poolPath, '[]')
  }
  const oldPool = JSON.parse(fs.readFileSync(poolPath));
  let isExisted = false;
  oldPool.forEach(log => {
    if (JSON.stringify(log) === JSON.stringify(upData)) isExisted = true;
  });
  if (isExisted) {
    return true;
  }
  for (let item of upData.data) {
    if (item.includes(`%EF%BF%BD`)) return false;
  }
  oldPool.push(upData);
  fs.writeFileSync(poolPath, JSON.stringify(oldPool, null, 2));
  return true;
};

const saveAll = async () => {
  for (let pool of pools) {
    await save(pool);
  }
  console.log(`Updated @ ${new Date()}`);
};

saveAll();
// getUpData('custom').then(r => {
//   fs.writeFileSync('tmp.json', JSON.stringify(r, null, 2))
// })
// setInterval(saveAll, 4 * 60 * 60 * 1000);
const schedule = require('../gacha/node_modules/node-schedule');

const rule = new schedule.RecurrenceRule();
rule.minute = [0, 1, 2, 10];
schedule.scheduleJob(rule, saveAll)
