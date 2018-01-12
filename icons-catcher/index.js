/* Check update once an hour and send mail when:
    - new items were found
    - one day/week/month passed
   Use forever
*/

var updater = require('./javascript/updater.js');
var mailer = require('./javascript/email.js');
var logfileCreater = require('./javascript/logfile.js');

var oneHour = 60 * 60 * 1000;
var halfHour = oneHour / 2;
var oneDay = 24 * oneHour;
var oneWeek = 7 * oneDay;

var range = 2500;

var logfile = logfileCreater.logfile('./statics/', 'nohup.out', 'error.log');
// logfile.init()

// logfile.init('[Process] Start @ ' + Date().toString());

var hourChecking = setInterval(function () {
  logfile.write('[Update] Start @ ' + Date().toString());
  getUpdateMessage(range);
}, oneHour);
// halfHour for test

var dailyMail = setInterval(function () { sendStatus(Date()); }, oneDay);

var weeklyMail = setInterval(function () {
  var ops = {
    subject: 'Weekly Mail With Log',
    text: 'Attachment(s): nohup.out',
    attachments: [{
      filename: 'nohup.out',
      path: './nohup.out'
    }]
  };
  mailer.sendEmail(ops, function (err, info) {
    if (err) console.error(err);
    else logfile.write('[Mail] Weekly log send. Info:' +
                        (info.response ? info.response : info));
  });
}, oneWeek);


function getUpdateMessage(range_) {
  updater.updateImg(range_ ? range_ : 2500, function (ctr, data) {
    if (ctr[0]) {
      logfile.write('[Update] Completed. New items founded. Start sending mail.');
      sendEmail(ctr, data);
    }
    else logfile.write('[Update] Completed. No new item was found this time.');
  });
}

function sendEmail(ctr, data) {
  var subject = '图鉴更新啦!';
  var text = '更新了 ' + ctr[0] + ' 个新图鉴:\n' +
             '\t编号从 ' + (data[0] + 1) +
             ' 到 ' + (data[data.length - 1] + 1);
  mailer.sendEmail({subject: subject, text: text}, function (err, info) {
    if (err) logfile.error(err);
    else logfile.write('[Mail] Update infomation send. Info:' +
                       (info.response ? info.response : info));
  });
}

function sendStatus(stats) {
  var mail = {
    subject: 'Daily Update Log',
    text: 'Time: ' + stats
  };
  mailer.sendEmail(mail, function (err, info) {
    if (err) logfile.error(err);
    else logfile.write('[Mail] Daily log send. Info:' +
                       (info.response ? info.response : info));
  });
}