const fs = require('fs');
const axios = require('axios');

const debug = true;

const pets = require('./pet.json');

const petsObj = {};
pets.forEach(e => {
  petsObj[e.id] = e;
});

const baseURL = 'https://www.mihoyo.com/data/getDataByID';

async function  getData() {
  let proms = [];
  let data = [];
  for (let i = 7000; i < 7300; i++) {
    proms.push(await getItem(i, data));
  }
  return Promise.all(proms).then(() => {
    data.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });
    fs.writeFile('pet.json', JSON.stringify(data, null, 2), err => {
      if (err) console.error(err);
    });
    console.log('DONE');
  });
}

async function getItem (id, arr) {
  debug && console.log('Loading:', id);
  if (id in petsObj) {
    debug && console.log('Existed:', id);
    return Promise.resolve(arr.push(petsObj[id]));
  }
  return new Promise(async resolve => {
    await axios.get(baseURL, { params: { id, type: 'pet' } })
    .then(res => {
      if (res.data.retcode == 1) {
        debug && console.log('Loaded:', id);
        return resolve(arr.push(res.data.data));
      }
      else return resolve();
    }).catch(e => {
      debug && console.error(e)
      return resolve();
    })
  });
}

getData();
