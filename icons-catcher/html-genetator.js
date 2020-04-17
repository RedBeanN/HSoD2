var fs = require('fs');

var dest = './statics/demo.html';
var head = '<html><head> \
              <title>图鉴</title> \
            </head><body>';
var foot = '</body></html>';

var imgHead = '<img src = "http://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/';
var imgFoot = '.png" />';

var br = '<br />';

var imgs = [];

for (var i = 1000, j = 0; i <= 3000; i++, j++) {
  imgs.push(imgHead + i + imgFoot);
  if (j == 10) imgs.push(br), j = 0;
}

var html = head;
for (var i = 0; i < imgs.length; i++) {
  html += imgs[i];
}
html += foot;

fs.writeFile(dest, html, function (err, data) {
  if (err) console.error(err);
  // else console.log(data);
})