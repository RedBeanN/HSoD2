//import('vue.min.js');

((Vue) => {
'use strict';

let app = new Vue({
  el: '#app',
  data: {},
  methods: {
    select: function (selected) {
      // change stigmata page
      Array.prototype.forEach.call($$('.option'), op => {
        op.classList.remove('selected');
      });
      $$(`.${selected}`)[0].classList.add('selected');
      $$('#stigmata').classList = [selected]
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