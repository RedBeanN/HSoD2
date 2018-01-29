let schedule = require('node-schedule');

let rule = new schedule.RecurrenceRule();
rule.minute = [0, 10, 20, 30, 40, 50];

let watcher = require('./world-battle-watcher');

let job = schedule.scheduleJob(rule, () => {
  watcher();
  console.log(`Schedule completed @ ${Date()}`);
});