var http = require('http');
var fs = require('fs');
var path = require('path');
var process = require('process');

function join(filename) {
  return path.join(__dirname, filename);
}

/*
  exports: [
    updateImg(range, callback(ctr[], newItems[]))
  ]
*/

exports.updateImg = function(range_, cb) {

  var baseUrl = 'http://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/';
  var dir = '../statics/new/';
  var mimeType = '.png';
  var range = range_ ? range_ : 3000;
  var title;
  var ctr = [0, 0, 0]; // save, existed, not-found
  var newItem = [];

  fs.readFile(join('../statics/title.txt'), function (err, data) {
    if (err) return console.error(err);
    title = formatTitle(data.toString().split(''));
    var index = 0;
    for (; index < range; index ++) {
      if (title[index] == 0) break;
    }
    ctr[1] += index;
    if (index < range) getImg(generateImgLink(), index);
    else cb(ctr, newItem);

    function getImg(arr, index) {
      // process.stdout.write('[Process] ' + (index + 1) + ' of ' + range + '\033[K\r');
      // process.stdout.write(`[Process] ${index + 1} of ${range} \x1b[K\r`);
      if (title[index] != 1) {
        var ai = arr[index].split('/');
        var dest = path.join(__dirname, dir, ai[ai.length - 1]);
        downloadImage(arr[index], dest, function (err, data) {
          if (!err) {
            title[index] = 1;
            newItem.push(index);
            ctr[0]++;
          } else ctr[2]++;
          if (index < arr.length - 1) getImg(arr, index + 1);
          else writeTitle(title, function () { cb(ctr, newItem); }); 
        });
      } else {
        ctr[1]++;
        if (index < arr.length - 1) getImg(arr, index + 1);
        else writeTitle(title, function () { cb(ctr, newItem); });
      }
    }
  });

  function writeTitle(title, cb) {
    fs.writeFile(join('../statics/title.txt'), title.join(''), function (err, data) {
      if (err) console.error('Writing title.txt error: ', err);
      cb();
    });
  }

  function generateImgLink () {
    var links = [];
    for (var i = 1; i <= range; i++) {
      var tmp = i;
      if (tmp < 10) tmp = '00' + +tmp;
      else if (tmp < 100) tmp = '0' + +tmp;
      else tmp = +tmp;
      links.push(baseUrl + tmp + mimeType);
    }
    return links;
  }

  function downloadImage(src, dest, cb) {
    // still have some bugs
    var item = src.split('/')[src.split('/').length - 1];
    // timer
    var time_wrapper = function(req) {
      return function() {
        req.abort();
      };
    };
    var request = http.get(src, function (res) {
      clearTimeout(timeout);

      if (res.statusCode != 200) {
        cb({statusCode: res.statusCode}, dest);
      }
      else {
        res.setEncoding('binary');
        var img = '';
        res.on('data', function (chunk) {
          img += chunk;
        });
        res.on('end', function (err) {
          if (err) console.error('Error ocurred:', err);
          fs.writeFile(dest, img, 'binary', function (err, data) {
            if (err) console.error('[Writing] Error @', item);
            cb(null, dest);
          });
        });
      }
    });
    var fn = time_wrapper(request);
    var timeout = setTimeout(fn, 2000);
    request.on('error', function(err) {
      cb({message: 'Timeout Error'}, dest);
    });
  }

  function formatTitle (title) {
    if (title.length < range) title.length = range;
    for (var i = 0; i <= range; i++) {
      if (title[i] != 1) title[i] = 0;
    }
    return title;
  }

}

// exports.updateImg(3000);
