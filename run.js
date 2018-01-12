let exec = require('child_process').exec;

let iconsCatcher = exec(join('icons-catcher', 'index.js'), (err, stdout, stderr) => {
  if (err) console.error(err);
  console.log(stdout.match(/info.*/)[0]);
});

let cmsCatch = exec(join('cms-catcher', 'test.js'), (err, stdout, stderr) => {
  if (err) console.error(err);
  console.log(stdout.match(/info.*/)[0]);
});

let uplist = exec(join('uplist-auto', 'rule-parser.js'), (err, stdout, stderr) => {
  if (err) console.error(err);
console.log(stdout.match(/info.*/)[0]);
});

let server = exec(join('up-list', 'bin/www'), (err, stdout, stderr) => {
  if (err) console.error(err);
  console.log(stdout.match(/info.*/)[0]);
});

function join(path, filename, logfile = 'forever.log') {
  return `forever start -l E:/Projects/${path}/${logfile} -a ${path}/${filename}`;
}
