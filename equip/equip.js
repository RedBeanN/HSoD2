const fs = require('fs');
const axios = require('axios');

const baseURL = 'https://www.mihoyo.com/data/getDataByID';
const type = ['weapon', 'costume', 'passive_skill'];

async function getData() {
  let proms = [];
  let data = [];
  for (let i = 0; i < 3000; i++) {
    proms.push(await getItem(i, data));
  }
  for (let i = 20000; i < 22000; i++) {
    proms.push(await getItem(i, data));
  }
  return Promise.all(proms).then(_ => {
    data.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id)
    });
    fs.writeFile('equips.json', JSON.stringify(data, null, 2), err => {
      if (err) console.error(err);
    });
    console.log('DONE.');
  })
}

async function getItem (id, arr) {
  return new Promise(async (resolve, reject) => {
    let ctr = {
      num: 0,
      add () {
        this.num ++;
        if (this.num >= 3) resolve();
      }
    }
    for (let t of type) {
      await axios.get(baseURL, { params: { id, type: t } })
      .then(res => {
        if (res.data.retcode == 1) {
          resolve(arr.push(res.data.data));
        }
        else ctr.add();
      }).catch(e => {
        // console.error(e);
        resolve();
      })
    }
  });
}

getData();
