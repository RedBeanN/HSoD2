const https = require('https');
const fs = require('fs');
const path = require('path');
const getUrl = server => {
  if (server === 'beta') return `https://api-takumi.mihoyo.com/common/announcement/api/getAnnList?game_biz=bh2_cn&region=ptr01&platform=ios&bundle_id=com.miHoYo.HSoDv2IosBeta&game=bh2`;
  return `https://api-takumi.mihoyo.com/common/announcement/api/getAnnList?game_biz=bh2_cn&region=gf01&platform=ios&bundle_id=com.miHoYo.HSoDv2CN&game=bh2`
};

const deal = (data, server = 3) => {
  const result = JSON.parse(data).data;
  const annList = [];
  for (let list of result.list) {
    for (let ann of list.list) {
      const { title, ann_id, start_time, content } = ann;
      const startTime = start_time.substr(5, 5).replace('-', '').trim();
      // console.log(startTime, ann_id, title);
      const filename = `${startTime}-${ann_id + 5000}`;
      fs.writeFileSync(path.resolve(__dirname, 'statics/html', `${server}/${filename}.html`), content);
      annList.push({
        filename, title,
      });
    }
  }
  const list = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'statics/titles.json')));
  for (let ann of annList) {
    if (!list[server][ann.filename]) list[server][ann.filename] = ann.title;
  }
  fs.writeFileSync(path.resolve(__dirname, `statics/titles.json`), JSON.stringify(list, null, 2));
};

const getList = (_server = 3) => {
  const server = _server === 3 ? 'original' : 'beta';
  const url = getUrl(server);
  https.get(url, res => {
    let data = '';
    res.setEncoding('utf-8');
    res.on('data', chunk => data += chunk);
    res.on('end', err => {
      if (err) console.error(err);
      else deal(data, _server);
    })
  });
};

// getList(3);
module.exports = getList;
