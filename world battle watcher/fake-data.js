const fs = require('fs');

let data = {};

for (let day = 1; day < 21; day++) {
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 6; minute++) {
      let day_ = day < 10 ? '0' + +day : +day;
      let hour_ = hour < 10 ? '0' + +hour : +hour;
      let minute_ = +minute + '0';
      let date = `2018-01-${day_} ${hour_}:${minute_}`;
      let leftTotal = (day * 24 + hour) * 60 + minute * 10, rightTotal = leftTotal;
      let left1 = (day * 24 + hour) * 16 + minute * 2, right1 = left1 - minute * 2;
      let left2 = left1 / 2 + 1200, right2 = right1 / 2 + 1000;
      let arr = [leftTotal, rightTotal, left1, right1, left2, right2];
      data[date] = arr;
    }
  }
}

fs.writeFile('./fake-data.json', JSON.stringify(data, null, 2), err => {
  if (err) console.error(err);
});
