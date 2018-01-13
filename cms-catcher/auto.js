var getter = require('./cms-catcher.js');
var oneday = 24 * 60 *60 * 1000;
var threeHour = oneday / 8;

getter();
getter(18);
console.log('Get CMS @', Date());

var timer = setInterval(function () {
  getter();
  getter(18);
  console.log('Get CMS @', Date());
},  threeHour);
