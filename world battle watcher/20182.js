const axios = require('axios');
const baseUrl = 'http://event.mihoyo.com/activity_beta_api/crossfaction/status';

async function getData (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

async function getAllData (arr) {
  return new Promise(resolve => {
    const a = [];
    const promises = arr.map(async data => await getData(baseUrl, data));
    promises.forEach(p => p.then(res => a.push(JSON.stringify(res))));
    Promise.all(promises).then(() => resolve(a));
  });
}

async function getDataArray () {
  const data = require('./20182/urldata.json');
  const a = await getAllData(data);
  console.log(a[0] === a[1]);
}

getDataArray();
