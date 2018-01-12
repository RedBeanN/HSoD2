// ((Vue, axios) => {
// 'use strict';

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
      if (this.searchInput.isFocus) return '/images/icons/Material/search_black.png';
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
    }
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
      document.getElementById('filter-input').classList.remove('hide');
      document.getElementById('equip-filter').classList.remove('collapse');
      document.getElementById('filter-input').focus();
    },
    blurSearch() {
      if (this.searchInput.text) return;
      this.searchInput.isFocus = false;
      document.getElementById('filter-input').classList.add('hide');
      document.getElementById('equip-filter').classList.add('collapse');
    }
  },
  created: function() {
    // load data here
    this.select('high');
    // this.loading = false;
  }
});

document.getElementById('loading-page').remove();
document.getElementById('app').style.display = 'block';
// })(Vue, axios);