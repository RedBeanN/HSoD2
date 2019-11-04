(() => {
const $$ = mdui.JQ;
$$('body').removeClass('mdui-drawer-body-left');
window.gtag = window.gtag || function () {};
const store = window.localStorage || {
  setItem () {},
  getItem () {},
  removeItem () {},
  clear () {},
};

const isGotten = name => {
  const got = localStorage.getItem('gacha-spec');
  if (!got) return false;
  const items = got.split('$');
  if (items.includes(name)) return true;
  return false;
};
const gotSpec = name => {
  let got = localStorage.getItem('gacha-spec');
  got += `$${name}`;
  localStorage.setItem('gacha-spec', got);
  return true;
};
const isOutOfDate = (start, end) => {
  const s = new Date(start), e = new Date(end);
  const now = Date.now();
  if (now - s > 0 && e - now > 0) return false;
  return true;
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
    currentResults: [],
    showSnackbar: true,
    showDialog: false,
    disableGacha: false,
    totalCosts: 0,
    totalGachas: 0,
    specialGacha: [],
  },
  computed: {
    currentRecords () {
      return this.records[this.current.pool][this.current.gachatype];
    },
    currentSpecialGacha () {
      return this.specialGacha.filter(i => !isOutOfDate(i.startTime, i.endTime));
    },
    recordList () {
      /**
       * 划分保底线
       * 十连 / 公主魔法少女单抽不重置, 固定10发一保底,
       * 单抽除大小姐外, 按7 / 10发一保底
       */
      const records = this.currentRecords.filter(() => true);
      if (this.current.pool === 'middle') return records.reverse();
      const list = [];
      /**
       * 十连的情况, 只需每10发一条线
       */
      if (this.current.gachatype === 't') {
        records.forEach((record, index, arr) => {
          list.push(Object.assign({}, record, {type: 'equip'}));
          if (index % 10 === 9 && index < arr.length - 1) {
            list.push({type: 'hr'});
          }
        });
        return list.reverse();
      }
      /**
       * 魔女每期重置, 这里只判断连续的装备单抽, 而不考虑是不是跨期
       */
      const circ = this.current.pool === 'custom' ? 7 : 10;
      let start = 0;
      if (this.current.pool === 'custom') {
        start = records.length - 1;
        for (let i = records.length - 1; i >= 0; i--) {
          if (records[i].equip.indexOf('【') === -1) break;
          else start = i;
        }
      }
      /**
       * 单抽在一个周期的保底前有保底线
       */
      for (let i = 0; i < start; i++) list.push(Object.assign({}, records[i], {type: 'equip'}));
      for (let ctr = 0; start < records.length; start++, ctr++) {
        if (ctr >= circ) {
          list.push({type: 'hr'});
          ctr = 0;
        }
        list.push(Object.assign({}, records[start], {type: 'equip'}));
      }
      return list.reverse();
    },
    upItems () {
      const up = { high: [], custom: [], special: [], middle: [] };
      for (let pool in this.probs) {
        /**
         * 过滤出当期 up 内容
         */
        if (pool === 'middle') {/* do nothing */}
        else if (pool === 'custom') {
          /**
           * 对魔女使魔 up 特别优化
           */
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
      /**
       * 单抽保底判定
       * 返回值:
       *   0: 完全随机
       *   1: 强制出金
       *   2: 强制不出金
       */
      if (this.current.pool === 'middle') return 0;
      let circ = 10, interval = [], bd = false;
      const records = this.records[this.current.pool]['s'];
      let last = records.length;
      let start = Math.floor(last / circ) * circ;
      /**
       * 对魔女单抽特别判定
       * 只考虑最后一次连续的装备单抽, 无论是不是同一期
       */
      if (this.current.pool === 'custom') {
        circ = 7;
        let rec = last - 1;
        for (let i = last - 1; i > 0; i--) {
          if (records[i].equip.indexOf('【') === -1) {
            rec = i;
            break;
          }
        }
        if (rec !== last - 1) start = rec + 1;
        else start = Math.floor(last / circ) * circ;
      }
      for (; start < last; start ++) {
        let i = records[start];
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
    totalOrders () {
      return (this.totalCosts / 8088).toFixed(2);
    },
    totalMoney () {
      return (this.totalOrders * 648).toFixed(2);
    },
  },
  methods: {
    pushRecord (t, ...r) {
      const cost = this.current.pool === 'middle' ? 98 : 280;
      this.totalCosts += r.length * cost;
      this.totalGachas += r.length;
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
    loadSpecial () {
      showLoading();
      const self = this;
      axios.get('/data/specialGacha.json').then(res => {
        self.specialGacha = res.data;
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
    async ten () {
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
      if (this.showDialog) await this.showResultDialog(arr);
      this.pushRecord('t', ...arr);
    },
    async loadResult (result, isGod) {
      const equipname = result[2].replace(' +1', '');
      const url = '/illustrate/v2/detail/all/title/' + equipname;
      const title = result[2] + (result[3] ? result[3] : '');
      try {
        const res = await axios.get(url);
        let equip = null;
        if (res.data) {
          if (res.data[0] && res.data[0].img) equip = res.data[0];
          else if (res.data.img) equip = res.data;
          else throw 'Not Found';
          let isAwaken = false;
          if (equip.posterId && equip.posterId !== '0') isAwaken = Math.random() < 0.1;
          return {
            img: this.getImgSrc(equip.img),
            title,
            isGod,
            isAwaken,
          }
        }
        // if (res.data && res.data[0] && res.data[0].img) return {
        //   img: this.getImgSrc(res.data[0].img),
        //   title,
        //   isGod,
        // };
        // else if (res.data && res.data.img) return {
        //   img: this.getImgSrc(res.data.img),
        //   title,
        //   isGod,
        // };
        else throw 'Not Found';
      } catch (e) {
        return {
          title,
        }
      }
    },
    async showResultDialog (arr) {
      this.disableGacha = true;
      showLoading();
      const resultsPromises = [];
      const currentResults = [];
      for (let i of arr) {
        if (i.isSpec) {
          resultsPromises.push(new Promise(resolve => {
            resolve({
              img: this.getSpecImg(i.img),
              title: i.equip,
              isGod: false,
              isSpec: true,
            })
          }))
        } else {
          const reg = /(【.*】)?([^×]*)(×\d)?/g;
          const result = reg.exec(i.equip);
          // console.log(result[2]);
          if (!result[2]) resultsPromises.push({ title: i.equip });
          else resultsPromises.push(this.loadResult(result, i.isGod));
        }
      }
      currentResults.push(...await Promise.all(resultsPromises));
      this.currentResults = currentResults;
      this.$nextTick(() => {
        hideLoading();
        (new mdui.Dialog('#gacha-dialog', {
          history: false,
        })).open();
        this.disableGacha = false;
      });
      return;
    },
    gacha (data, baodi = 0) {
      const { equips, total, god } = data;
      if (!baodi) {
        for (let spec of this.currentSpecialGacha) {
          if (spec.pool !== this.current.pool) continue;
          if (isGotten(spec.name)) continue;
          // if (isOutOfDate(spec.startTime, spec.endTime)) continue;
          const r = getRandom(100);
          if (r < spec.rate) {
            if (!this.showDialog && this.showSnackbar) {
              const s = mdui.snackbar({
                message: spec.name,
                position: 'right-bottom',
                timeout: 700,
              });
              s.$snackbar.addClass('yellow');
            }
            gotSpec(spec.name);
            return {
              date: formatDate(),
              equip: spec.name,
              isGod: false,
              isSpec: true,
              img: spec.img,
            }
          }
        }
      }
      let r = getRandom(total);
      // pets up does not have baodi
      if (god === 0) baodi = 2;
      if (baodi === 1) while(r > god) r = getRandom(total);
      else if (baodi === 2) while(r <= god) r = getRandom(total);
      for (let e of equips) if (e.rate >= r) {
        let name = formatName(e.name);
        if (!this.showDialog && this.showSnackbar) {
          let s = mdui.snackbar({
            message: name,
            position: 'right-bottom',
            timeout: 700
          });
          if (r <= god) s.$snackbar.addClass('yellow');
        }
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
      localStorage.removeItem('gacha-spec');
      mdui.snackbar({
        message: '清除成功',
        position: 'right-bottom',
        timeout: 300,
      });
      Vue.nextTick(() => store.clear())
    },
    getImgSrc (img) {
      img = img.toString();
      const prefix = 'https://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/';
      if (img.length < 3) img = ('000' + img).slice(-3);
      return prefix + img + '.png';
    },
    getSpecImg (img) {
      return `https://api-1256168079.cos.ap-chengdu.myqcloud.com/${img}`;
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
    this.loadSpecial();
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
