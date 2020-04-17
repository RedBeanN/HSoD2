const nodeOpenCC = require('node-opencc');

const confMap = {
  'hk2s': 'hongKongToSimplified',
  's2hk': 'simplifiedToHongKong',
  's2t': 'simplifiedToTraditional',
  's2tw': 'simplifiedToTaiwan',
  't2hk': 'traditionalToHongKong',
  't2s': 'traditionalToSimplified',
  't2tw': 'traditionalToTaiwan',
  'tw2s': 'taiwanToSimplified',
};

function opencc (text, _conf = 't2s') {
  return new Promise((resolve, reject) => {
    try {
      resolve(nodeOpenCC[confMap[_conf]](text));
    } catch (e) {
      reject('?');
    }
  });
}

module.exports = opencc;