(function() {
  'use strict';
  var queue = [];
  var user = {
    'character': 'kiana',
    'cloth': 1,
    'weapons': [1,1,1],
    'pins': [1,1,1],
    'pet': 1,
    'friendCloth': 1
  };
  var equipList = [];

  var enemy = {
    'hp': 100,
    'buff': [],
    'debuff': []
  };

  // calculate
  /*
    function Equip(level, addons, break1, break2[, stars])
      // data + adds * breakN
      eq.func[]  equipSelected-es accessStage-as attackMoment-am enemyDefeated-ed
        es[0] = function(user) [example]
          var allStaticMoveSpeed = staticMoveSpeed; // dog.staticMoveSpeed from Dog(99, 198, 10, 10[, 6])
          user.pins.forEach(function(pin) {
            allStaticMoveSpeed += pin.addons;
            if (pin.staticMoveSpeed) allStaticMoveSpeed += pin.staticMoveSpeed;
          });
          if(user.cloth.staticMoveSpeed)
          if(user.friendCloth.staticMoveSpeed)
          buffRate = 1.3 * allStaticMoveSpeed
        am[0] = function(user, enemy, statusBuffer, dmgBuffer)
  */

  function init() {
    var sys = {
      es: [],
      as: [],
      am: [],
      ed: [],
      props: {
        moveSpeed: 250,
        criticalRate: 0.05,
        hp: 2500
      }
    };
    for (var pin in user.pins) {
      if (pin.es) {
        pin.es.forEach((fn) => {
          es.push(fn);
        });
      }
    }
    sys.es.forEach(fn => {
      fn(user);
    });
    return sys;
  }

  // functions
  function getRandomResult(prob) { return (prob >= 1 || (prob > 0 && prob <= Math.random())); }

  function oneStep(weapon, user, monster) {
    
  }
  // console.log(getRandomResult(1.1), getRandomResult(0.5), getRandomResult(0), getRandomResult(-1));
})();