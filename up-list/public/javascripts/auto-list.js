((Vue, axios) => {
'use strict';

let app = new Vue({
  el: '#app',
  data: {
    pools: {'high': '公主', 'custom': '魔女', 'special': '魔法少女'},
    rows: [],
    loading: true, error: false,
    hintText: '加载中...',
    selectedPool: 'high',
    sorted: true,
  },
  computed: {
    maxCols() {
      let maxcols = 0;
      this.rows.forEach(row => {
        maxcols = (maxcols < row.data.length) ? row.data.length : maxcols;
      });
      return maxcols;
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
        })
        .catch(err => {
          app.hintText = '没有找到数据';
          app.loading = false;
          app.error = true;
        });
    },
    sortTable() {
      this.sorted = !this.sorted;
      let sorted = this.sorted;
      this.rows.sort((pre, now) => {
        let preTime = new Date(pre.startTime);
        let nowTime = new Date(now.startTime);
        return sorted ? preTime - nowTime : nowTime - preTime;
      });
    }
  },
  created: function() {
    // load data here
    this.select('high');
    this.sortTable();
    // this.loading = false;
  }
});

document.getElementById('loading-page').remove();
document.getElementById('app').style.display = 'block';
})(Vue, axios);