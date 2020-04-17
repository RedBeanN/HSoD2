var fs = require('fs');

var equips = [];
equips.length = 2500;
equips[1203] = '轩辕剑';
equips[1067] = 'Empty';
equips[1308] = 'Empty';
equips[1078] = '奥林匹斯戍卫';
equips[1291] = '旧印';
equips[717]  = '怪异杀手';

fs.writeFile('./equips', equips, function () {});
