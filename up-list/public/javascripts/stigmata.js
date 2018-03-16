//import('vue.min.js');

((Vue) => {
'use strict';

const cost = [
  0, 12, 30, 66, 138, 248, 446, 1115, 1148, 1182,
  1217, 1253, 1290, 1328, 1367, 1408, 1450, 1493, 1940,
  1998, 2057, 2118, 2160, 2203, 2247, 2291, 2336, 2382,
  2429, 2477, 2526, 2576, 2627, 2679, 2732, 2786, 2841,
  2883, 2926, 2969, 3013, 3058, 3103, 3149, 3196, 0
];
const maxLevel = {
  'kiana':   [3, 1, 3, 4, 4, 4, 3, 4, 4, 3, 3, 3, 3, 3],
  'bronya':  [1, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 4, 4, 4],
  'theresa': [1, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 4, 4, 4]
};
const stigmataName = {
  'kiana': '誓约之翼',
  'bronya': '守护回路',
  'theresa': '真实之瞳'
}

let app = new Vue({
  el: '#app',
  data: {
    character: 'kiana',
    currentLevel: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    isAbled: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    next: [
      [1], [2, 6, 10], [3, 12], [4, 5], [],
      [], [7, 13], [8, 9], [], [],
      [11], [12, 13], [2, 11], [6, 12]
    ],
    selected: 1,
    totalLevel: 1,
    totalCost: 0,
  },
  computed: {
    maxLevel () { return maxLevel[this.character] || maxLevel['kiana']; },
    nextCost () { return cost[this.totalLevel] || 0; },
    stigmataName () { return stigmataName[this.character]; },
  },
  methods: {
    selectStigmata (selected) {
      // change stigmata page
      forEach($$('.option'), op => { op.classList.remove('selected'); });
      $$(`.${selected}`)[0].classList.add('selected');
      // reset data
      for (let i in this.currentLevel) { this.currentLevel[i] = 0 }
      if (selected === 'kiana') this.currentLevel[0] = 1;
      this.totalLevel = this.currentLevel[0];
      this.totalCost = 0;
      this.character = selected;
    },
    selectIcon (selected) {
      forEach($$('.stigmata-icon'), icon => {
        icon.classList.remove('selected');
      });
      this.selected = selected;
      $$(`#icon-${selected}`).classList.add('selected');
    },
    minus (s) {
      if (this.currentLevel[s] > 0) {
        let isMinusable = !(this.character === 'kiana' &&
                            this.selected === 1 &&
                            this.currentLevel[0] === 1);
        // set isAbled when max
        if (this.currentLevel[s] === this.maxLevel[s]) {
          this.next[s].forEach(i => {
            // deny minus when next icons rely only on present
            if (this.isAbled[i] === 1) {
              if (this.currentLevel[i] != 0) isMinusable = false;
            }
            if (isMinusable) Vue.set(this.isAbled, i, this.isAbled[i] - 1);
          });
        }
        // minus after set isAbled
        if (isMinusable) {
          Vue.set(this.currentLevel, s, this.currentLevel[s] - 1);
          this.totalCost -= cost[this.totalLevel--];
        } else alert('请先重置后续天赋！');
      }
    },
    add (s) {
      if (this.currentLevel[s] < this.maxLevel[s]) {
        // add before set isAbled
        Vue.set(this.currentLevel, s, this.currentLevel[s] + 1);
        this.totalCost += cost[this.totalLevel++];
        // set isAbled when max
        if (this.currentLevel[s] === this.maxLevel[s]) {
          this.next[s].forEach(i => {
            Vue.set(this.isAbled, i, this.isAbled[i] + 1);
          });
        }
      }
    }
  }
});

function $$ (str) {
  if (typeof str != 'string') throw new Error(`Type Error: ${str} is not a string`);
  switch(str[0]) {
    case '#': return document.getElementById(str.substring(1));
    case '.': return document.getElementsByClassName(str.substring(1));
    default : return document.getElementsByTagName(str);
  }
}
// call Array.forEach
function forEach (...args) {
  return Array.prototype.forEach.call(...args);
}

// default status
$$('.option')[0].click();
$$('#icon-1').click();
})(Vue);