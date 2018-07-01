let exec = require('child_process').exec;
let path = require('path');

let watcher = exec(
  `forever start -l ${path.resolve(__dirname, '20182/forever.log')} -a schedule.js`,
  (err, stdout, stderr) => {
    if (err) console.error(err);
    console.log(stdout.match(/info.*/)[0]);
  }
)