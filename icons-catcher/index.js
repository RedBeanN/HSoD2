const http = require('http');
const fs = require('fs');
const path = require('path');

const parallel = require('./parallel');

const dir = 'statics/new';
const mimeType = '.png';
const baseUrl = 'http://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/';
const pngDir = 'statics/png';
const [ SAVED, EXISTED, NOTFOUND ] = [0, 1, 2];

const files = fs.readdirSync(path.resolve(__dirname, pngDir));

const download = (src, dest) => new Promise((resolve, reject) => {
  let timer;
  const req = http.get(src, res => {
    if (res.statusCode !== 200) return reject();
    res.setEncoding('binary');
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      clearTimeout(timer)
      fs.writeFileSync(dest, data, { encoding: 'binary' })
      resolve();
    });
    res.on('error', err => {
      console.error(err);
      reject(err);
    });
  });
  req.on('error', err => {
    reject(err);
  });
  timer = setTimeout(() => {
    req.destroy();
  }, 2000);
});
const downloadImg = index => {
  const img = index < 1000 ? ('000' + index).substr(-3) : index.toString();
  const filename = img + mimeType;
  const url = baseUrl + filename;
  const dest = `${dir}/${filename}`;
  if (files.includes(filename)) return Promise.resolve({
    type: EXISTED,
  });
  return download(url, dest).then(() => {
    return {
      type: SAVED,
    };
  }).catch(() => {
    return {
      type: NOTFOUND,
    };
  });
};

const updateImg = (range = 5000) => {
  const ctr = [0, 0, 0]; // saved, existed, not-found
  const ids = (new Array(range)).fill(0).map((_, i) => i);
  const getImg = id => new Promise(res => {
    process.stdout.write(`[Process] ${id + 1} of ${range} \x1b[K\r`);
    return downloadImg(id).then(({ type }) => {
      ctr[type] += 1;
      res();
    });
  });
  parallel(ids.map((_, i) => i), getImg).then(() => {
    console.log(`\n[ Saved: ${ctr[SAVED]} ]  [ Existed: ${ctr[EXISTED]} ]  [ Not-Found: ${ctr[NOTFOUND]} ]`);
  });
};

module.exports = updateImg;

if (require.main === module) {
  const range = parseInt(process.argv[2]);
  if (isNaN(range)) updateImg();
  else updateImg(range);
}
