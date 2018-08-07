const catcher = require('./gacha-catcher');
const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.minute = [0, 1, 2, 30, 31];

const catchData = () => {
  catcher().then(_ => {
    // console.log('[GACHA] Schedule completed @', Date());
    void 0;
  }).catch(err => {
    console.error('[GACHA] Error @', Date(), ':', err.message);
  });
};

catchData();

schedule.scheduleJob(rule, catchData);
