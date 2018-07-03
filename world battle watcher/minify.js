const schedule = require('node-schedule'),
      fs = require('fs'),
      path = require('path');

let rule = new schedule.RecurrenceRule();
rule.minute = [1, 31];

// let job = schedule.scheduleJob(rule, () => {
  fs.readFile(
    path.resolve(__dirname, '20182/data.json'),
    (err, data) => {
      if (err) console.error(err);
      let json = JSON.parse(data);
      if (Array.isArray(json)) {
        let fil = json.filter(item => {
          let min = item.time.substr(-2);
          if (min === '00' || min === '30') return true;
          return false;
        }).map(item => {
          return {
            time: item.time,
            data: item.data.top
          };
        });
        fs.writeFile(
          path.resolve(__dirname, '20182/minify.json'),
          JSON.stringify(fil),
          err => {
            if (err) console.error(err);
          }
        );
      }
    }
  );
// });