var fs = require('fs');

var all, list = [];
var lastUp = fs.readFileSync('./private/data/last-up');
var equips_ = fs.readFileSync('./private/data/equips');
var equips = equips_.toString().split(',');
// console.log(862, equips[862]);
lastUp = lastUp.toString().split(',');

// exports.pushList = function (data) {
//   return function() {
//     updateList(function (list) {
//       list.push(data);
//     });
//   };
// };
exports.updateList = function updateList (cb) {
  list = [];
  fs.readFile('./private/data/all', function (err, all_) {
    if (err) console.error(err);
    // fs.readFile('./private/data/equips', function (err, data) {
      // if (err) console.error(err);
      // equips = data.toString().split(',');
      all = JSON.parse(all_);
      var tmp;
      for (var i = 0; i < all.length; i++) {
        tmp = {
          "id": i + 1,
          "date": all[i].startTime == all[i].endTime ? all[i].startTime : all[i].startTime + ' ~ ' + all[i].endTime,
          "items": [{id: '', name: '', lastUp: ''}, {id: '', name: '', lastUp: ''}, {id: '', name: '', lastUp: ''}, {id: '', name: '', lastUp: ''}, {id: '', name: '', lastUp: ''}, {id: '', name: '', lastUp: ''}],
          "pool": all[i].pool,
          "special": all[i].special
        };
        for (var j = 0; j < all[i].equips.length; j++) {
          tmp.items[j].id = all[i].equips[j].toString();
          tmp.items[j].name = equips[all[i].equips[j]];
          tmp.items[j].lastUp = lastUp[all[i].equips[j]];
          tmp.items[j].startTime = all[i].startTime;
        }
        list.push(tmp);
      }
      // list.reverse();
      cb(list);
    // });
  });
};

exports.parseUpdate = function parseUpdate (body) {
  // equips = fs.readFileSync('./private/data/equips');
  var startTime = '' + body.startYear + '.' +
                  (body.startMonth < 10 ? '0' + body.startMonth : body.startMonth) + '.' +
                  (body.startDay < 10 ? '0' + body.startDay : body.startDay);
  var endTime = '' + body.endYear + '.' +
                (body.endMonth < 10 ? '0' + body.endMonth : body.endMonth) + '.' +
                (body.endDay < 10 ? '0' + body.endDay : body.endDay);
  var eqs = [{id: '', name: '', lastUp: ''}, {id: '', name: '', lastUp: ''}, {id: '', name: '', lastUp: ''}, {id: '', name: '', lastUp: ''}, {id: '', name: '', lastUp: ''}, {id: '', name: '', lastUp: ''}];
  if (body.id1) eqs[0] = {id: body.id1, name: body.name1, lastUp: startTime, startTime: startTime};
  if (body.id2) eqs[1] = {id: body.id2, name: body.name2, lastUp: startTime, startTime: startTime};
  if (body.id3) eqs[2] = {id: body.id3, name: body.name3, lastUp: startTime, startTime: startTime};
  if (body.id4) eqs[3] = {id: body.id4, name: body.name4, lastUp: startTime, startTime: startTime};
  if (body.id5) eqs[4] = {id: body.id5, name: body.name5, lastUp: startTime, startTime: startTime};
  if (body.id6) eqs[5] = {id: body.id6, name: body.name6, lastUp: startTime, startTime: startTime};
  if (body.id1 && !equips[body.id1]) equips[body.id1] = body.name1;
  if (body.id2 && !equips[body.id2]) equips[body.id2] = body.name2;
  if (body.id3 && !equips[body.id3]) equips[body.id3] = body.name3;
  if (body.id4 && !equips[body.id4]) equips[body.id4] = body.name4;
  if (body.id5 && !equips[body.id5]) equips[body.id5] = body.name5;
  if (body.id6 && !equips[body.id6]) equips[body.id6] = body.name6;
  exports.updateEquips(equips);
  return {
    startTime: startTime,
    endTime: endTime,
    date: startTime + ' ~ ' + endTime,
    items: eqs,
    pool: body.pool,
    special: body.special
  };
};

exports.updateAllList = function updateAllList (data) {
  var tmp = {
    startTime: data.startTime,
    endTime: data.endTime,
    equips: [],
    pool: data.pool,
    special: data.special
  };
  for (var i = 0; i < 6; i++) {
    if (data.items[i].id != '') tmp.equips.push(data.items[i].id);
  }
  // save changes in all file and last-up file
  // all file is always being changed but list can just read once
  var all_ = fs.readFileSync('./private/data/all');
  all = JSON.parse(all_);
  all.push(tmp)
  exports.updateLastUp(tmp.startTime, tmp.equips);
  fs.writeFile('./private/data/all', JSON.stringify(all), function (err) {
    if (err) console.error(err);
  });
};

exports.updateEquips = function updateEquips (equips) {
  fs.writeFile('./private/data/equips', equips, function (err) {
    if (err) console.error(err);
  });
};

exports.updateLastUp = function updateLastUp (date, arr) {
  arr.forEach(function (id) {
    lastUp[id] = date;
  });
  fs.writeFileSync('./private/data/last-up', lastUp);
};