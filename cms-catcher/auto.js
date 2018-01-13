var getter = require('./cms-catcher.js');
var oneday = 24 * 60 *60 * 1000;
var fourHour = oneday / 6;

getter();
getter(18);
console.log('Get CMS @', Date());

var timer = setInterval(function () {
  getter();
  getter(18);
  console.log('Get CMS @', Date());
},  fourHour);
