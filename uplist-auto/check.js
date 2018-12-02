const fs = require('fs');
const path = require('path');

const pools = ['high', 'custom', 'pet', 'special'];

function check (pool) {
  fs.readFile(path.resolve(__dirname, 'rule-data/', `${pool}.json`), (err, data) => {
    if (err) console.log(err);
    data = JSON.parse(data.toString());
    if (typeof data === 'object') {
      for (let i = 0; i < data.length; i++) {
        let item = data[i], isMC = false;
        for (let equip of item.data) {
          if (equip.indexOf('�') !== -1) {
            isMC = true;
          }
        }
        if (isMC) {
          data.splice(i, 1);
          i--;
        }
      }
    }
    fs.writeFile(path.resolve(__dirname, 'rule-data/', `${pool}.json`), JSON.stringify(data, null, 2), err => {
      if (err) console.log(err);
    });
  });
}

for (let pool of pools) check(pool);
