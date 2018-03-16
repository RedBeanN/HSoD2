//import('vue.min.js');

((Vue) => {
'use strict';

const cost = [
  "0", "12", "30", "66", "138", "248", "446", "1115", "1148", "1182",
  "1217", "1253", "1290", "1328", "1367", "1408", "1450", "1493", "1940",
  "1998", "2057", "2118", "2160", "2203", "2247", "2291", "2336", "2382",
  "2429", "2477", "2526", "2576", "2627", "2679", "2732", "2786", "2841",
  "2883", "2926", "2969", "3013", "3058", "3103", "3149", "3196"
];
const levels = {
  'kiana':   [3, 3, 3, 4, 4, 4, 3, 4, 4, 4, 3, 3, 3, 3],
  'bronya':  [1, 3, 3, 3, 3, 4, 4, 3, 3, 3, 3, 4, 4, 4],
  'theresa': [1, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 4, 4, 4]
};

let app = new Vue({
  el: '#app',
  data: {
    character: 'kiana',
    currentLevel: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  computed: {
    levels () {
      return levels[this.character] || levels['kiana'];
    }
  },
  methods: {
    select (selected) {
      // change stigmata page
      Array.prototype.forEach.call($$('.option'), op => {
        op.classList.remove('selected');
      });
      $$(`.${selected}`)[0].classList.add('selected');
      $$('#stigmata').classList = [selected];
      this.character = selected;
    }
  }
});

function $$(str) {
  if (typeof str != 'string') throw new Error(`Type Error: ${str} is not a string`);
  switch(str[0]) {
    case '#': return document.getElementById(str.substring(1));
    case '.': return document.getElementsByClassName(str.substring(1));
    default : return document.getElementsByTagName(str);
  }
}

$$('.option')[0].click();
})(Vue);