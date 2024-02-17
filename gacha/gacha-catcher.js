const cheerio = require('cheerio');
const http = require('http');
const fs = require('fs');
const axios = require('axios');

const baseUrl = 'http://cms.benghuai.com/mihoyo/hsod2_gacha_rules/index.php/gacha/';
const pools = ['high', 'custom', 'special', 'middle', 'festival'];
const tail = '?region=3_1';

module.exports = () => {
  const all = JSON.parse(fs.readFileSync('gacha.json'));
  return Promise.all(pools.map(p => {
    return catchOne(p).then(data => {
      if (data.equips && data.equips.length) all[p] = data
    });
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
    return Promise.resolve(parseHTML(res.data, pool));
  });
}

const formatSpecial = rows => {
  const upEquips = []
  const godEquips = []
  const commonEquips = []
  for (const row of rows) {
    const [name, type, prop] = row
    if (type === '徽章' || type === '武器' || type === '服装' || type === '使魔碎片' || type === '材料') {
      const match = name.match(/\[(\d).\]$/)
      const star = match && match[1] ? parseInt(match[1]) : 1
      if (star < 5) {
        const propNum = parseInt(prop.replace(/\.|%/g, ''))
        commonEquips.push({ name, prop: propNum })
      } else {
        if (!prop) {
          upEquips.push(name)
        } else {
          const propNum = parseInt(prop.replace(/\.|%/g, ''))
          godEquips.push({ name, prop: propNum })
        }
      }
    }
  }
  const baseProp = (1204 + 1023) * 6
  const everyProp = Math.ceil(baseProp / upEquips.length)
  // console.log(everyProp, upEquips.length, commonEquips.length)
  let rate = 0
  const equips = []
  for (const item of upEquips) {
    rate += everyProp
    equips.push({
      name: item,
      rate,
    })
  }
  for (const item of godEquips) {
    rate += item.prop
    equips.push({
      name: item.name,
      rate,
    })
  }
  const total = rate
  for (const item of commonEquips) {
    rate += item.prop
    equips.push({
      name: item.name,
      rate,
    })
  }
  return {
    equips,
    total: rate,
    god: total,
    com: total,
  }
}

function parseHTML (str, pool) {
  return new Promise((resolve, reject) => {
    const $ = cheerio.load(str, {decodeEntities: false});
    const isMj = str.indexOf('魔女祈愿') !== -1;
    const arr = [];
    let isGod = true;
    let isCom = false;
    const rows = []
    $('table tbody tr').each(function (index, ele) {
      // if (arr.length > 10) return
      const tbs = []
      $(ele).children().each((index, child) => {
        tbs.push($(child).text())
      })
      rows.push(tbs)
      const data = [];
      isCom = $(this).hasClass('god');
      let isSpec = false;
      if (isMj) isGod = isCom;
      $(this).children().each(function (index) {
        let text = $(this).text();
        if (text.indexOf('使魔') !== -1 && index !== 0) {
          isGod = false;
          // console.log(index, text)
        }
        if (text.includes(`角色`) || text.includes(`皮肤`)) isSpec = true;
        data.push(text);
      });
      if (data.length < 3) return
      data.push(isGod, isCom);
      // console.log(data, isGod, isCom, isMj)
      if (isSpec) {
        // console.log(data);
      } else {
        arr.push(data);
      }
    });
    const isCustomSelect = rows.some(r => {
      return r[1] === '自选装备'
    })
    // console.log(isCustomSelect)
    // const toFormat = rows.map((row, index) => {
    //   const data = [row[0], row[1], row[2]]
    // })
    // console.log(formatSpecial(rows))
    // saveFile(JSON.stringify(form, null, 2), 'gacha.json', err => {
    //   if (err) reject(err);
    //   else resolve();
    // });
    if (isCustomSelect) {
      // console.log('custom')
      resolve(formatSpecial(rows))
    } else {
      // console.log('common')
      const form = formatData(arr);
      resolve(form);
    }
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
    // console.log(e)
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

if (!module.parent) {
  // module.exports();
  catchOne('high').then(r => {
    // console.log(r)
    fs.writeFileSync('test.json', JSON.stringify(r, null, 2))
  })
}