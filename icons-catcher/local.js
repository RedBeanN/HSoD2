// A quickly check without wait. Console.log only.

var updater = require('./javascript/updater');

console.log('[Local Process] Update start.');

updater.updateImg(4500, function(ctr, data) {
  console.log('[Local Process] Update completed.');
  console.log('[ Saved: ' + ctr[0] +
        ' ]    [ Existed: ' + ctr[1] +
        ' ]    [ Not-Found: ' + ctr[2] +
        ' ]\n');
})
