let http = require('http');
let fs = require('fs');

let baseUrl = 'http://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/';
let series = 'Series/', type = 'Type/';

let dmgType = {
  'none': '无', 'physic': '物理', 'power': '能量',
  'snow': '冰', 'fire': '火', 'light': '电', 'poison': '毒' };

{
  for (let key in dmgType) {
    if (key != 'none') {
      download(type, key);
    }
  }
  for (let i = 0; i < 46; i++) {
    let key = 'Series' + (i < 10 ? '0' + (+i) : +i);
    download(series, key);
  }
}

function download (route, name) {
  let src = resolvePath(route, name);
  http.get(src, res => {
    res.setEncoding('binary');
    let img = '';
    res.on('data', chunk => {
      img += chunk;
    });
    res.on('end', err => {
      if (!err) fs.writeFileSync(getPath(route, name), img, 'binary', (err, data) => {
        if (err) console.error(err);
      });
    });
  });
}

function resolvePath (route, name) {
  return baseUrl + route + name + '.png';
}

function getPath (route, name) {
  return `../statics/icons/${route}/${name}.png`.toLowerCase();
}