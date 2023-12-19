const https = require('https');
const fs = require('fs');
const path = require('path');
const getUrl = server => {
  // if (server === 'beta') return `https://api-takumi.mihoyo.com/common/announcement/api/getAnnList?game_biz=bh2_cn&region=beta01&platform=ios&bundle_id=com.miHoYo.HSoDv2IosBeta&game=bh2`;
  if (server === 'beta') return `https://api-takumi-static.mihoyo.com/common/bh2_cn/announcement/api/getAnnContent?game=bh2&game_biz=bh2_cn&lang=zh-cn&bundle_id=com.miHoYo.HSoDv2IosBeta&platform=ios&region=beta01`
  // return `https://api-takumi.mihoyo.com/common/announcement/api/getAnnList?game_biz=bh2_cn&region=gf01&platform=ios&bundle_id=com.miHoYo.HSoDv2CN&game=bh2`
  return `https://api-takumi-static.mihoyo.com/common/bh2_cn/announcement/api/getAnnContent?game=bh2&game_biz=bh2_cn&lang=zh-cn&bundle_id=com.miHoYo.HSoDv2CN&platform=ios&region=gf01`
};
const getMainUrl = server => {
  if (server === 'beta') return `https://api-takumi.mihoyo.com/common/bh2_cn/announcement/api/getAnnList?game=bh2&game_biz=bh2_cn&lang=zh-cn&region=beta01&platform=ios&bundle_id=com.miHoYo.HSoDv2IosBeta`
  return `https://api-takumi.mihoyo.com/common/bh2_cn/announcement/api/getAnnList?game=bh2&game_biz=bh2_cn&lang=zh-cn&region=gf01&platform=ios&bundle_id=com.miHoYo.HSoDv2CN`
}
//https://api-takumi-static.mihoyo.com/common/bh2_cn/announcement/api/getAnnContent?game=bh2&game_biz=bh2_cn&lang=zh-cn&bundle_id=com.miHoYo.HSoDv2IosBeta&platform=ios&region=beta01

const deal = (data, contents, server = 3) => {
  const result = JSON.parse(data).data;
  const annList = [];
  const map = new Map()
  const allList = JSON.parse(contents).data
  // console.log(allList)
  for (const a of allList.list) {
    map.set(a.ann_id, a.content)
  }
  for (let list of result.list) {
    for (let ann of list.list) {
      const { title, ann_id, start_time } = ann;
      const content = map.has(ann_id) ? map.get(ann_id) : ann.content
      const startTime = start_time.substr(5, 5).replace('-', '').trim();
      // console.log(startTime, ann_id, title, content);
      const filename = `${startTime}-${ann_id + 6000}`;
      fs.writeFileSync(path.resolve(__dirname, 'statics/html', `${server}/${filename}.html`), content);
      annList.push({
        filename, title,
      });
    }
  }
  const list = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'statics/titles.json')));
  for (let ann of annList) {
    list[server][ann.filename] = ann.title;
  }
  fs.writeFileSync(path.resolve(__dirname, `statics/titles.json`), JSON.stringify(list, null, 2));
};

const getList = (_server = 3) => {
  const server = _server === 3 ? 'original' : 'beta';
  const url = getUrl(server);
  https.get(getMainUrl(server), r => {
    let all = ''
    r.setEncoding('utf-8')
    r.on('data', chunk => all += chunk)
    r.on('end', err => {
      if (err) return console.error(err)
      https.get(url, res => {
        let data = '';
        res.setEncoding('utf-8');
        res.on('data', chunk => data += chunk);
        res.on('end', err => {
          if (err) console.error(err);
          else deal(all, data, _server);
        })
      });
    })
  })
};

// getList(3);
module.exports = getList;
