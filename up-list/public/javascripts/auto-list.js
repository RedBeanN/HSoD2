// ((Vue, axios) => {
// 'use strict';

function $$(str) {
  // simply use $$('#id') or $$('.class')
  if (typeof str != 'string') throw new Error(`Type Error: ${str} is not a string`);
  switch(str[0]) {
    case '#': return document.getElementById(str.substring(1));
    case '.': return document.getElementsByClassName(str.substring(1));
    default : return document.getElementsByTagName(str);
  }
}

let app = new Vue({
  el: '#app',
  data: {
    pools: {'high': '公主', 'custom': '魔女', 'special': '魔法少女'},
    rows: [],
    loading: true, error: false,
    hintText: '加载中...',
    selectedPool: 'high',
    sortedFlag: true,
    searchInput: {
      isFocus: false,
      text: ''
    },
  },
  computed: {
    maxCols() {
      let maxcols = 0;
      this.rows.forEach(row => {
        maxcols = (maxcols < row.data.length) ? row.data.length : maxcols;
      });
      return maxcols;
    },
    searchIcon() {
      if (!this.searchInput.isFocus) return '/images/icons/Material/search_black.png';
      else return '/images/icons/Material/search_white.png';
    },
    filterRows() {
      // if (this.searchInput.text == '') return this.rows;
      let fr = [];
      let text = this.searchInput.text;
      this.rows.forEach(row => {
        if (row.startTime.indexOf(text) != -1 || row.endTime.indexOf(text) != -1) {
          fr.push(row);
        } else {
          for (let i in row.data) {
            if (row.data[i].indexOf(text) != -1) {
              fr.push(row);
              break;
            }
          }
        }
      });
      return fr;
    },
    nameList() {
      let list = {};
      this.rows.forEach(row => {
        row.data.forEach(equip => {
          if (!list[equip] || (new Date(list[equip])) < (new Date(row.startTime))) {
            list[equip] = row.startTime.split(' ')[0];
          }
        });
      });
      return list;
    },
  },
  methods: {
    select(pool = 'high') {
      // console.log(pool);
      this.selectedPool = pool;
      this.loadData(pool);
    },
    loadData(pool = 'high') {
      this.loading = true;
      this.hintText = '加载中...';
      axios.get(`/list/auto/${pool}`)
        .then(res => {
          app.rows = res.data;
          app.loading = false;
          app.error = false;
          app.sortedFlag = true;
          app.sortTable();
        })
        .catch(err => {
          app.hintText = '没有找到数据';
          app.loading = false;
          app.error = true;
        });
    },
    sortTable() {
      this.sortedFlag = !this.sortedFlag;
      let sortedFlag = this.sortedFlag;
      this.rows.sort((pre, now) => {
        let preTime = new Date(pre.startTime);
        let nowTime = new Date(now.startTime);
        return sortedFlag ? preTime - nowTime : nowTime - preTime;
      });
    },
    focusSearch() {
      this.searchInput.isFocus = true;
      $$('#filter-input').classList.remove('hide');
      $$('#equip-filter').classList.remove('collapse');
      $$('#filter-input').focus();
    },
    blurSearch() {
      if (this.searchInput.text) return;
      this.searchInput.isFocus = false;
      $$('#filter-input').classList.add('hide');
      $$('#equip-filter').classList.add('collapse');
    }
  },
  created: function() {
    // load data here
    this.select('high');
    // this.loading = false;
  }
});

$$('#loading-page').remove();
$$('#app').style.display = 'block';
// })(Vue, axios);