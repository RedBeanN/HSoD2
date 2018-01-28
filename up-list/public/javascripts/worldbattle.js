//import('vue.min.js');
//import('axios.min.js');
//import('echarts.min.js');
//import('line.min.js');

// ((Vue, axios) => {
'use strict';
let app = new Vue({
  el: '#app',
  data: {
    charts: {
      main: {
        columns: [], rows: [],
        title: { text: '总分' }
      },
      scores: {
        columns: [], rows: [],
        title: { text: '分数线' }
      },
      delta: {
        columns: [], rows: [],
        title: { text: '分数变化' }
      },
    },
    settings: {
      legendPosition: 'top',
      loading: false,
    },
    styles: {
      fullScreen: {
        width: '100%',
        display: 'block'
      },
      halfScreen: {
        width: '50%',
        display: 'inline-block'
      },
    }
  },
  created () { this.loadData() },
  methods: {
    loadData () {
      let settings = this.settings;
      settings.loading = true;
      let main = this.charts.main;
      let scores = this.charts.scores;
      let delta = this.charts.delta;
      axios.get('/worldbattle/fake-data').then(res => {
        let data = res.data;
        parseMainData(main, data);
        parseScores(scores, data);
        parseDelta(delta, data);
        settings.loading = false;
      });
    }
  },
  components: { VeLine }
});
function parseMainData (main, data) {
  let rows = [];
  for (let key in data) {
    let row = {
      '时间': key,
      '左方阵营总分': data[key][0],
      '右方阵营总分': data[key][1],
    };
    rows.push(row);
  }
  main.columns =  [
    '时间',
    '左方阵营总分',
    '右方阵营总分',
  ];
  main.rows = rows;
}
function parseScores (scores, data) {
  let rows = [];
  for (let key in data) {
    let row = {
      '时间': key,
      '左方阵营前 1000 分数线': data[key][2],
      '右方阵营前 1000 分数线': data[key][3],
      '左方阵营前 2000 分数线': data[key][4],
      '右方阵营前 2000 分数线': data[key][5],
    };
    rows.push(row);
  }
  scores.columns =  [
    '时间',
    '左方阵营前 1000 分数线',
    '右方阵营前 1000 分数线',
    '左方阵营前 2000 分数线',
    '右方阵营前 2000 分数线',
  ];
  scores.rows = rows;
}
function parseDelta (delta, data) {
  let rows = [];
  for (let key in data) {
    let row = {
      '时间': key,
      '左方阵营总分': data[key][0],
      '右方阵营总分': data[key][1],
    };
    rows.push(row);
  }
  let deltas = [];
  deltas.push({
    '时间': rows[0]['时间'],
    '左方阵营分数变化': /*rows[0]['左方阵营总分']*/10,
    '右方阵营分数变化': /*rows[0]['右方阵营总分']*/10
  });
  for (let i = 1; i < rows.length; i++) {
    let pre = rows[i - 1], now = rows[i];
    let dy = {
      '时间': now['时间'],
      '左方阵营分数变化': now['左方阵营总分'] - pre['左方阵营总分'],
      '右方阵营分数变化': now['右方阵营总分'] - pre['右方阵营总分']
    };
    deltas.push(dy);
  }
  delta.columns = [
    '时间',
    '左方阵营分数变化',
    '右方阵营分数变化'
  ];
  delta.rows = deltas;
}

// })(Vue, axios);