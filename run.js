let exec = require('child_process').exec;
let path = require('path');

let iconsCatcher = exec(join('icons-catcher', 'auto.js'), (err, stdout, stderr) => {
  if (err) console.error(err);
  console.log(stdout.match(/info.*/)[0]);
});

let cmsCatch = exec(join('cms-catcher', 'auto.js'), (err, stdout, stderr) => {
  if (err) console.error(err);
  console.log(stdout.match(/info.*/)[0]);
});

let uplist = exec(join('uplist-auto', 'auto.js'), (err, stdout, stderr) => {
  if (err) console.error(err);
console.log(stdout.match(/info.*/)[0]);
});

let server = exec(join('up-list', 'bin/www'), (err, stdout, stderr) => {
  if (err) console.error(err);
  console.log(stdout.match(/info.*/)[0]);
});

function join(path_, filename, logfile = 'forever.log') {
  return `forever start -l ${path.join(__dirname, path_, logfile)} -a ${path}/${filename}`;
}
