//import('vue.min.js');
//import('axios.min.js');
//import('echarts.min.js');
//import('line.min.js');

((Vue, axios) => {
'use strict';
const map = ["普洛姆特", "冰铃", "书包酱", "茵朵兰", "德哈琳", "奥菲莉亚"]
const app = new Vue({
  el: '#app',
  data: {
    charts: {
      main: {
        columns: [], rows: [],
        title: { text: '实物分数线' }
      },
      round: {
        columns: [], rows: [],
        title: { text: '阵营争夺积分' }
      }
    },
    settings: {
      legendPosition: 'top',
      loading: false,
      colors: ['#d38dff', '#8bd6f6', '#ffd188', '#ffa8da', '#f5e2ff', '#669aff']
    },
    chartSettings: { scale: [true, true] },
    zoom: {
      type: 'slider',
      start: 0,
      end: 100
    }
  },
  created () {
    this.loadData();
  },
  methods: {
    loadData () {
      const self = this;
      self.settings.loading = true;
      axios.get('/worldbattle/20182/minify').then(res => {
        let data = res.data;
        parseChartData(self.charts.main, data);
        self.settings.loading = false;
      });
    },
  },
  components: { VeLine }
});
function parseChartData (chart, data) {
  const rows = [];
  data.forEach(item => {
    let row = { '时间': item.time };
    map.forEach((pet, index) => {
      row[pet] = item.data[index];
    });
    rows.push(row);
  });
  chart.columns = [ '时间', ...map ];
  chart.rows = rows;
}

})(Vue, axios);