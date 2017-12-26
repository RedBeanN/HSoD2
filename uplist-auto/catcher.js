var http = require('http');
var fs = require('fs');

var url = 'http://cms.mihoyo.com/mihoyo/hsod2_webview/index.php/broadcastTop/List';

function main(cb) {
  getCmsList(url, data => {
    parseUrlList(data, list => {
      if (list.length) {
        list.forEach(li => {
          getUps(li, data => {
            cb(data);
            // console.log(data);
            // if (data.constructor === Array) {
            //   console.log('装备:',data);
            // } else console.log('使魔:', data);
          }, err => {
            // console.log(err);
          });
        });
      }
    });
  });
}


function getCmsList(url, cb) {
  var data = '';
  http.get(url, res => {
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', err => {
      if (err) console.log(err);
      cb(data.toString());
    });
  });
}

function parseUrlList(data, cb) {
  var listReg = new RegExp(/<li.*?<\/li>/, 'g');
  var linkReg = new RegExp(/\"http.*?\"/, 'g');
  var data_ = data.match(listReg);
  var links = [];
  data_.forEach(item => {
    var tmp = item.match(linkReg)[0];
    tmp = tmp.substring(1, tmp.length - 1);
    // console.log('Link:', tmp);
    links.push(tmp);
  });
  cb(links);
}

function getUps(link, success, fail) {
  var data = '';
  // console.log('[getUps link]', link);
  http.get(link.toString(), res => {
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', err => {
      if (err) console.log(err);
      // console.log(data);
      parseUps(data.toString(), success, fail);
    });
  });
}

function parseUps(page, success, fail) {
  var tableReg = new RegExp(/table.*?<\/table>/, 'g');
  // var itemReg = new RegExp(/[\u4e00-\u9fa5·]+/, 'g');
  var itemReg = new RegExp(/>.*?</, 'g');
  var page_ = page.match(tableReg);
  // console.log(page_);
  if (page.indexOf('祈愿') < 0) fail('This page is not about up.');
  else if (!page_) fail('This is not a up page!');
  else if(page.indexOf('使魔') < 0) {
    // equips up
    var arr = page_[0].match(itemReg);
    var items = [];
    if (arr && arr.length) {
      arr.forEach(i => {
        if (i != '><') {
          i = i.substring(1, i.length - 1);
          items.push(i.replace(/&nbsp;/g, ''));
        }
        // items.push(i);
      });
      items.push(page.match(/活动时间.*24:00/)[0].match(/\d.*24:00/)[0]);
      success(items);
    } else fail('This is not a up page!');
  } else {
    // pets up
    var obj = {};
    page_.length = 2;
    page_.forEach(i => {
      var ar = i.match(/nbsp.*?nbsp/g);
      console.log(ar);
      if (ar && ar.length >= 3) {
        obj[ar[0].substring(5, ar[0].length - 5)] = ar[2].substring(5, ar[2].length - 5);
      }
    });
    // console.log(JSON.stringify(obj));
    if (JSON.stringify(obj) == '{}') fail('This page is not about up.');
    else {
      obj['活动时间'] = page.match(/活动时间.*24:00/)[0].match(/\d.*24:00/)[0];
      success(obj);
    }
  }
}

main(data => {
  if (data.constructor === Array) {
    // console.log('装备:', data);
    var equips = fs.readFileSync('./equips.json');
    equips = JSON.parse(equips);
    var date = data[data.length - 1];
    data.length = data.length - 1;
    if (!equips[date]) {
      equips[date] = data;
      fs.writeFileSync('./equips.json', JSON.stringify(equips, null, 2));
    }
  } else {
    // console.log('使魔:', data);
    var pets = fs.readFileSync('./pets.json');
    pets = JSON.parse(pets);
    if (!pets[data['活动时间']]) {
      pets[data['活动时间']] = {};
      for (var prop in data) {
        if (prop != '活动时间') pets[data['活动时间']][prop] = data[prop];
      }
      // console.log(JSON.stringify(pets));
      fs.writeFileSync('./pets.json', JSON.stringify(pets, null, 2));
    }
  }
});