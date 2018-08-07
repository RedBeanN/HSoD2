window.onload = () => {
const $$ = mdui.JQ;
$$('body').removeClass('mdui-drawer-body-left');

// const gachaTab = new mdui.Tab('#gachas');

const app = new Vue({
  el: '#app',
  data: {
    records: {
      'high': { 's': [], 't': [] },
      'custom': { 's': [], 't': [] },
      'special': { 's': [], 't': [] },
    },
    current: {
      pool: 'high',
      gacha: 's',
      gachatype: 's',
    },
    pools: ['custom', 'high'],
    poolmap: {
      'high': '公主',
      'custom': '魔女',
      'special': '魔法少女',
    },
    gachas: ['s', 't'],
    probs: {},
  },
  computed: {
    currentRecords () {
      return this.records[this.current.pool][this.current.gachatype];
    },
    reverseRecords () {
      return this.currentRecords.filter(i => true).reverse();
    },
    baodi () {
      let circ = 10;
      if (this.current.pool === 'custom') circ = 7;
      let interval = [], bd = false;
      for (let i of this.records[this.current.pool]['s']) {
        interval.push(i);
        if (i.isGod) bd = true;
        if (interval.length >= circ) {
          bd = false;
          interval = [];
        }
      }
      if (!bd && interval.length === circ - 1) return 1;
      if (bd && this.current.pool === 'custom') return 2;
      else return 0;
    },
  },
  methods: {
    pushRecord (t, ...r) {
      this.records[this.current.pool][t].push(...r);
    },
    setPool (t) {
      if (t !== this.current.pool) {
        this.current.pool = t;
        // $$('#app-tab>a').removeClass('mdui-shadow-1');
      }
    },
    selectType (g) {
      if (g !== this.current.gachatype) {
        this.current.gachatype = g;
        let tabs = $$('#gachas>a');
        tabs.toggleClass('mdui-tab-active');
        // $$('#gachas').mutation();
        // if (g === 's') tabs[0].addClass('mdui-tab-active');
      }
    },
    loadProb () {
      showLoading();
      const self = this;
      axios.get('/gacha/data').then(res => {
        self.probs = res.data;
        let pools = [];
        for (let p in self.probs) {
          if (self.probs[p].total) pools.push(p);
          self.pools = pools;
        }
        hideLoading();
      });
    },
    single () {
      this.selectType('s');
      const pool = this.current.pool;
      const data = this.probs[pool];
      this.pushRecord('s', this.gacha(data, this.baodi));
    },
    ten () {
      this.selectType('t');
      const pool = this.current.pool;
      const data = this.probs[pool];
      const arr = [];
      let baodi = false;
      for (let i = 0; i < 10; i++) {
        let s = this.gacha(data, 0);
        if (s.isGod) baodi = true;
        if (i === 9 && !baodi) s = this.gacha(data, 1);
        arr.push(s);
      }
      this.pushRecord('t', ...arr);
    },
    gacha (data, baodi = 0) {
      const { equips, total, god } = data;
      let r = getRandom(total);
      if (baodi === 1) while(r > god) r = getRandom(total);
      else if (baodi === 2) while(r <= god) r = getRandom(total);
      for (let e of equips) {
        if (e.rate >= r) {
          let s = mdui.snackbar({
            message: e.name,
            position: 'right-bottom',
            timeout: 700
          });
          if (r <= god) s.$snackbar.addClass('yellow');
          return {
            date: formatDate(new Date()),
            equip: e.name,
            isGod: r <= god
          }
        }
      }
    },
  },
  created () {
    this.loadProb();
  }
});

function getRandom (range) {
  return Math.floor(Math.random() * range + 1);
}

function formatDate (d = new Date()) {
  // const year = d.getFullYear(),
  //       month = d.getMonth() + 1,
  //       date = d.getDate(),
  //       hour = d.getHours(),
  //       min = d.getMinutes(),
  //       sec = d.getSeconds();
  // return `${year}-${month}-${date} ${hour}:${min}:${sec}`
  return d.toISOString().replace('T', ' ').slice(0,-5);
}

function showLoading () {
  $$('#progress').css('opacity', 1);
}
function hideLoading () {
  $$('#progress').css('opacity', 0);
}

};