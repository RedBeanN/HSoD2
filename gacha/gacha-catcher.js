const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');
const axios = require('axios');

const baseUrl = 'http://cms.mihoyo.com/mihoyo/hsod2_gacha_rules/index.php/gacha/';
const pools = ['high', 'custom', 'special', 'middle'];
const tail = '?region=3_1';

module.exports = () => {
  const all = {};
  return Promise.all(pools.map(p => {
    return catchOne(p).then(data => all[p] = data);
  })).then(() => {
    /**
     * Fix bug with messy code �
     */
    for (let pool in all) {
      for (let item of all[pool].equips) {
        if (item.name.indexOf(decodeURI('%EF%BF%BD')) !== -1) return;
      }
    }
    saveFile(JSON.stringify(all, null, 2), 'gacha.json');
  });
};

function catchOne(pool) {
  const url = baseUrl + pool + tail;
  // return new Promise((resolve, reject) => {
  //   const req = http.get(url, res => {
  //     let data = '';
  //     res.on('data', chunk => data += chunk);
  //     res.on('end', err => {
  //       if (err) reject(err);
  //       else parseHTML(data).then(resolve, reject);
  //     });
  //     res.on('error', reject);
  //   });
  //   req.on('error', reject);
  // });
  return axios.get(url).then(res => {
    return Promise.resolve(parseHTML(res.data));
  });
}

function parseHTML (str) {
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(str, {decodeEntities: false});
    const isMj = str.indexOf('魔女祈愿') !== -1;
    const arr = [];
    let isGod = true;
    let isCom = false;
    $('.equip-prob tbody tr').each(function () {
      const data = [];
      isCom = $(this).hasClass('god');
      if (isMj) isGod = isCom;
      $(this).children().each(function () {
        let text = $(this).text();
        if (text.indexOf('使魔') !== -1) isGod = false;
        data.push(text);
      });
      data.push(isGod, isCom);
      arr.push(data);
    });
    const form = formatData(arr);
    // saveFile(JSON.stringify(form, null, 2), 'gacha.json', err => {
    //   if (err) reject(err);
    //   else resolve();
    // });
    resolve(form);
  });
}

function saveFile (f, p) {
  fs.writeFile(p, f, {encoding: 'utf-8'}, () => {});
}

function formatData (arr) {
  const form = [];
  let rate = 0;
  let god = 0;
  let com = 0;
  for (let e of arr) {
    let [name, _, prop, isGod, isCom] = e;
    rate = rate + parseInt(prop.replace('.', ''));
    if (isGod) god = rate;
    if (isCom) com = rate;
    form.push({name, rate});
  }
  return {
    equips: form,
    total: rate,
    god,
    com
  }
}
