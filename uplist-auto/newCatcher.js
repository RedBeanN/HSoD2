const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = `http://cms.benghuai.com/mihoyo/hsod2_gacha_rules/index.php/gacha/`;
const tail = `?region=3_1`;

const pools = ['high', 'custom', 'special', 'festival'];

const getUpData = async pool => {
  const { data } = await axios.get(`${baseUrl}${pool}${tail}`);
  const $ = cheerio.load(data, { decodeEntities: false });
  const times = data.toString().match(/\d{4}-.*:\d{2}/g);
  if (!times) return null;
  const time = times[times.length - 1];
  const [startTime, endTime] = time.split('至');
  const list = [];
  $(`.equip-prob tbody tr`).each((index, ele) => {
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
  const upData = {
    startTime,
    endTime,
    data: list.filter(i => i.isGod).map(i => i.name.replace(/\[\d★\]/, '')),
  };
  return upData;
};

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
setInterval(saveAll, 4 * 60 * 60 * 1000);
