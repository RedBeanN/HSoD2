(Vue => {
'use strict';

let app = new Vue({
  el: '#app',
  data: {
    pools: {'custom': '公主', 'high': '魔女', 'special': '魔法少女'},
    titles: [],
    rows: []
  },
  computed: {},
  methods: {
    select(pool) {
      console.log(pool);
    }
  }
});

document.getElementById('loading-page').remove();
document.getElementById('app').style.display = 'block';
})(Vue);