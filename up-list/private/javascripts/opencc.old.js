/**
 * ABANDONED: Use node-opencc instead.
 */

const http = require('http');
const qs = require('querystring');

function opencc(text, conf) {
  /*
    text: text to be converted
    conf: t2s s2t tw2sp ...
  */
  return new Promise((resolve, reject) => {
    let _data = qs.stringify(Object.assign({
      config: (conf || 't2s') + '.json',
      precise: 0
    }, { text }));
    let options = {
      hostname: 'opencc.byvoid.com',
      port: 80,
      path: '/convert',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': Buffer.byteLength(_data)
      }
    };
    let req = http.request(options, function(res) {
      let data = '';
      res.setEncoding('utf-8');
      res.on('data', chunk => data += chunk );
      res.on('end', () => resolve(data) );
    });
    req.on('error', err => reject(err) );
    req.write(_data);
    req.end();
  });
}

module.exports = opencc;
