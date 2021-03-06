var http = require('http');
var fs = require('fs');
var _path = require('path');

function join(filepath) {
  return _path.join(__dirname, filepath);
}

var url = 'http://cms.benghuai.com/mihoyo/hsod2_webview/index.php/broadcastTop/List/';
var basePath = '/statics/';

module.exports = function getList (server = 3) {
  baseUrl = url + '?build=' + (+server);
  // console.log(baseUrl);
  http.get(baseUrl, function (res) {
    var data = '';
    res.setEncoding('utf-8');
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function (err) {
      if (err) console.log(err);
      // console.log(data);
      deal(data);
    });
  });

  function deal(data) {
    data = data.toString();
    var listReg = new RegExp(/<li.*?<\/li>/, 'g');
    var linkReg = new RegExp(/\"http.*?\"/, 'g');
    var idReg = new RegExp(/id=\d+/, 'g')
    var listArr = data.match(listReg);
    // console.log((listArr[0].match(/id=\d+/))[0]);

    // var titleList = JSON.parse(fs.readFileSync(basePath + 'titles.json'));

    listArr.forEach(function (li) {
      // parse item
      var link_ = li.match(linkReg)[0];
      // "http://..."
      var id_ = +li.match(idReg)[0].split('=')[1];
      // 1234 which typeof id_ === "number"
      var tmp = li.match(/mid\".*?<\/td>/)[0];
      var date_ = tmp.match(/\d{2}\/\d{2}/)[0];
      // "01/01"
      var title_ = tmp.match(/xt>.*?</)[0];
      // the title of this page
      // if (title_.indexOf('内容') != -1 || title_.indexOf('福利活动') != -1) {
      //   console.log('更新啦');
      // }

      // check if html is already existed
      title_ = title_.substring(3, title_.length - 1);
      // if (!titleList[date_.replace('/', '') + id_]) {
      savePage(link_, id_, date_, function(filename) {
        updateCmsList(filename, title_);
      });
      // }
    });
  }

  function savePage (link, id, date, cb) {
    // console.log('LINK:', link);
    link = link.substring(1, link.length - 1);
    http.get(link, function (res) {
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function (err) {
        if (err) console.log(err);
        fs.writeFileSync(resolvePath(id, date), data, 'utf-8');
        cb(date.replace('/', '') + '-' + id);
      });
    });
  }

  function resolvePath(id, date) {
    // var path = basePath + 'html/' + '/' + date.replace('/', '') + '-' + id + '.html';
    var path = join(`${basePath}html/${server}/${date.replace('/', '')}-${id}.html`);
    return path;
  }

  function updateCmsList (filename, title) {
    var list = fs.readFileSync(join(basePath + 'titles.json'));
    list = JSON.parse(list);
    if (!list[server][filename]) list[server][filename] = title.toString();
    fs.writeFileSync(join(basePath + 'titles.json'), JSON.stringify(list, null, 2));
  }

// getList();
}
