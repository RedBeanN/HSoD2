(() => {
const $$ = mdui.JQ;
$$('body').removeClass('mdui-drawer-body-left');
const gtag = window.gtag || function () {};
const store = window.localStorage;
if (!store) store = {
  setItem () {},
  getItem () {},
  removeItem () {},
  clear () {},
};

// const gachaTab = new mdui.Tab('#gachas');

const app = new Vue({
  el: '#app',
  data: {
    records: {
      'high': { 's': [], 't': [] },
      'custom': { 's': [], 't': [] },
      'special': { 's': [], 't': [] },
      'middle': { 's': [], 't': [] },
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
      'middle': '大小姐',
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
    upItems () {
      const up = { high: [], custom: [], special: [], middle: [] };
      for (let pool in this.probs) {
        if (pool === 'middle') {/* do nothing */}
        else if (pool === 'custom') {
          let o = {};
          for (let equip of this.probs[pool].equips) {
            if (equip.rate <= this.probs[pool].com) {
              o[equip.name.split('×')[0]] = 1;
            }
          }
          for (let i in o) up[pool].push(i);
        }
        else for (let equip of this.probs[pool].equips) {
          if (equip.rate <= this.probs[pool].com) {
            up[pool].push(equip.name);
          }
        }
      }
      return up;
    },
    baodi () {
      if (this.current.pool === 'middle') return 0;
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
      let result = this.gacha(data, this.baodi);
      let baodi = result.isGod ? 1 : 0;
      gtag('event', 'gacha', {
        'event_category': pool,
        'event_label': 'single',
        'value': baodi
      });
      this.pushRecord('s', result);
    },
    ten () {
      this.selectType('t');
      const pool = this.current.pool;
      const data = this.probs[pool];
      const arr = [];
      let baodi = 0;
      for (let i = 0; i < 10; i++) {
        let s;
        if (i === 9 && !baodi && this.current.pool !== 'middle')
          s = this.gacha(data, 1);
        else s = this.gacha(data, 0);
        if (s.isGod) baodi += 1;
        arr.push(s);
      }
      gtag('event', 'gacha', {
        'event_category': pool,
        'event_label': 'ten',
        'value': baodi
      });
      this.pushRecord('t', ...arr);
    },
    gacha (data, baodi = 0) {
      const { equips, total, god } = data;
      let r = getRandom(total);
      // pets up does not have baodi
      if (god === 0) baodi = 2;
      if (baodi === 1) while(r > god) r = getRandom(total);
      else if (baodi === 2) while(r <= god) r = getRandom(total);
      for (let e of equips) if (e.rate >= r) {
        let name = formatName(e.name);
        let s = mdui.snackbar({
          message: name,
          position: 'right-bottom',
          timeout: 700
        });
        if (r <= god) s.$snackbar.addClass('yellow');
        return {
          date: formatDate(),
          equip: name,
          isGod: r <= god
        }
      }
    },
    clearStorage () {
      this.records = {
        'high': { 's': [], 't': [] },
        'custom': { 's': [], 't': [] },
        'special': { 's': [], 't': [] },
        'middle': { 's': [], 't': [] },
      };
      mdui.snackbar({
        message: '清除成功',
        position: 'right-bottom',
        timeout: 300,
      });
      Vue.nextTick(() => store.clear())
    },
  },
  watch: {
    records: {
      handler (val) { store.setItem('records', JSON.stringify(val)) },
      deep: true,
    }
  },
  created () {
    let rec;
    if (rec = store.getItem('records')) this.records = JSON.parse(rec);
    this.loadProb();
  },
  mounted () {
    $$('.hide').removeClass('hide');
  },
  updated () {
    mdui.mutation();
  },
});

function getRandom (range) {
  return Math.floor(Math.random() * (range + 1));
}

function formatDate () {
  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const date = new Date(Date.now() - tzoffset).toISOString();
  return date.replace('T', ' ').slice(0,-5);
}

function formatName (s) {
  let a = s.split(/\[(\d.*)\]/g).reverse().filter(i => i !== '');
  if (a.length !== 2) return s;
  s = `【${a[0]}】${a[1]}`;
  let isAddOne = getRandom(15) === 7;
  if (isAddOne) return s + ' +1';
  return s;
}

function showLoading () {
  $$('#progress').css('opacity', 1);
}
function hideLoading () {
  $$('#progress').css('opacity', 0);
}

})();
