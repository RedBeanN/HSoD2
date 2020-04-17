/*
  This file is used to transfer list data
  from old page (/list) to new page (/list/auto).
  Needn't to use for second time.
*/

const fs = require('fs');

let equips = fs.readFileSync(oldPath('equips'));
equips = equips.toString().split(','); // Array
if (equips.constructor != Array) throw new Error('Type Error: equips is not an array');
let high = readArray(newPath('high.json')),
    custom = readArray(newPath('custom.json')),
    special = readArray(newPath('special.json'));

fs.readFile(oldPath('all'), (err, data) => {
  if (err) console.error(err);
  all = JSON.parse(data);
  if (all.constructor != Array) throw new Error('Type Error: all is not an array');
  all.forEach(item => {
    let startTime = formatDate(item.startTime, '00:00:00');
    let endTime = formatDate(item.endTime, '23:59:59');
    let pool = getPool(item.pool);
    let data = getData(item.equips);
    switch(pool) {
      case 'high':
        merge(high, {startTime, endTime, data});
        break;
      case 'custom':
        merge(custom, {startTime, endTime, data});
        break;
      case 'special':
        merge(special, {startTime, endTime, data});
        break;
    }
  });
  fs.writeFileSync(newPath('high.json'), JSON.stringify(high, null, 2));
  fs.writeFileSync(newPath('custom.json'), JSON.stringify(custom, null, 2));
  fs.writeFileSync(newPath('special.json'), JSON.stringify(special, null, 2));
});

function oldPath(filename) {
  return '../up-list/private/data/' + filename;
}
function newPath(filename) {
  return './rule-data/' + filename;
}
function formatDate(date_, time) {
  let date = date_.replace(/\./g, '-');
  return date + ' ' + time;
}
function getPool(pool_) {
  return { '公主': 'high', '魔女': 'custom', '魔法少女': 'special' }[pool_];
}
function getData(eq) {
  let data = [];
  eq.forEach(serial => {
    if (equips[serial]) data.push(equips[serial]);
    else throw new Error(`Error: No.${serial} is not found in equips`);
  });
  return data;
}

function readArray(path_) {
  let arr = fs.readFileSync(path_);
  arr = JSON.parse(arr);
  if (arr.constructor != Array) throw new Error(`Type Error: Target File(${path_}) is not a valid Array.`)
  return arr;
}

function merge(arr, obj) {
  if (arr.constructor != Array) throw new Error('Type Error: Invalid Array.');
  if (typeof obj != 'object') throw new Error('Type Error: Invalid Object.');
  let exist = false;
  arr.forEach(item => {
    if (item.startTime == obj.startTime &&
        item.endTime == obj.endTime) exist = true;
  });
  if (!exist) arr.push(obj);
  // for other usecase, return status
  return exist;
}