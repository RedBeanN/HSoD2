const fs = require('fs');
const v2 = require('./v2/minify');

const min = {};
for (let key in v2) {
  min[key] = v2[key].map(i => i.replace(
    /\d+\$(\d+)\$(\d+)\$(\d+)\$(.*)/g,
    (t, id, rarity, img, title) => {
      if (id === '0') return '';
      if (!rarity || !img || !title) return t;
      // 22娘和人体描边没有图片
      if (img === '1487' || img === '2902') return '';
      return `${img}$${rarity}$${title}`;
    }
  )).filter(i => i.length)
}
fs.writeFileSync('./minify.json', JSON.stringify(min));
