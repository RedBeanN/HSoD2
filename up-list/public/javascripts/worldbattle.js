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
      colors: ['#fa5788', '#83b9ff']
    },
    styles: {
      halfScreen: {
        width: 'calc(50% - 60px)',
        display: 'inline-block'
      },
    },
    chartSettings: {
      scale: [true, true]
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
      axios.get('/worldbattle/data').then(res => {
        let data = res.data;
        parseMainData(main, data);
        parseScores(scores, data);
        parseDelta(delta, main);
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
      '时间': key.substring(5),
      '九霄阵营总分': data[key]['faction_total_point'][1],
      '琪亚娜阵营总分': data[key]['faction_total_point'][2],
    };
    rows.push(row);
  }
  main.columns =  [
    '时间',
    '九霄阵营总分',
    '琪亚娜阵营总分',
  ];
  main.rows = rows;
}
function parseScores (scores, data) {
  let rows = [];
  for (let key in data) {
    let row = {
      '时间': key.substring(5),
      '九霄阵营前 1000 分数线': data[key]['faction_1000_point'][1],
      '琪亚娜阵营前 1000 分数线': data[key]['faction_1000_point'][2],
    };
    rows.push(row);
  }
  scores.columns =  [
    '时间',
    '九霄阵营前 1000 分数线',
    '琪亚娜阵营前 1000 分数线',
  ];
  scores.rows = rows;
}
function parseDelta (delta, main_) {
  let rows = [];
  let main = main_.rows;
  for (let i = 1; i < main.length; i++) {
    let now = main[i], pre = main[i - 1];
    let row = {
      '时间': now['时间'],
      '九霄阵营分数变化': now['九霄阵营总分'] - pre['九霄阵营总分'],
      '琪亚娜阵营分数变化': now['琪亚娜阵营总分'] - pre['琪亚娜阵营总分']
    };
    rows.push(row);
  }
  delta.columns = [
    '时间',
    '九霄阵营分数变化',
    '琪亚娜阵营分数变化'
  ];
  delta.rows = rows;
}

// })(Vue, axios);