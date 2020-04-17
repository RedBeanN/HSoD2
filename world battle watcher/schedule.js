// get faction data per 10 min

let schedule = require('node-schedule');

let rule = new schedule.RecurrenceRule();
rule.minute = [0, 10, 20, 30, 40, 50];

// let watcher = require('./world-battle-watcher');
let watcher = require('./20182/20182');

let job = schedule.scheduleJob(rule, () => {
  watcher();
  console.log(`Schedule completed @ ${Date()}`);
});