window.onload = () => {
const $$ = mdui.JQ;

const app = new Vue({
  el: '#app',
  data: {
    cards: [{
      title: '欢迎来到搞事学园',
      content: '您正在使用移动端测试版 , 目前功能还不完善 , 有任何意见建议欢迎发送到 me@hongshn.xyz ~'
    }],
    // pets: [
    //   { name: '普洛姆特', top: '', round: '' },
    //   { name: '冰铃',     top: '', round: '' },
    //   { name: '书包酱',   top: '', round: '' },
    //   { name: '茵朵兰',   top: '', round: '' },
    //   { name: '德哈琳',   top: '', round: '' },
    //   { name: '奥菲莉亚', top: '', round: '' },
    // ],
    balor: {
      crate: 420,
      cadds: 0,
      minus: 40,
      minmi: 150,
      wz: '',
    },
    drawer: [
      { url: '/list',         name: 'UP 记录' },
      { url: '/equip',             name: '装备模拟器' },
      { url: '/cms',               name: '公告记录' },
      { url: '/buglist',           name: '测试服 BUG 记录' },
      { url: '/worldbattle/20182', name: '阵营战记录' },
    ],
    drawerInst: null,
    swSize: {
      total: 0,
      font: 0,
      image: 0,
      script: 0,
      other: 0,
    },
  },
  computed: {
    balorRate () {
      const crate = this.balor.crate / 100,
            cadds = this.balor.cadds / 100,
            minus = this.balor.minus / 100,
            minmi = this.balor.minmi / 100;
      const max = (a, b) => a > b ? a : b;
      let baseCri = (2 + cadds) * (this.balor.wz ? 2 : 1);
      let cris = [baseCri];
      let i = 1;
      while (true) {
        if (crate > i) {
          let _cri = max(minmi, baseCri * (1 - minus * i));
          cris.push(_cri)
          i++;
        } else break;
      }
      return parseFloat(cris.reduce((pre = 1, cur) => pre * cur).toFixed(4)) + ' 倍';

    }
  },
  methods: {
    // updatePets () {
    //   $$('#fw').css('opacity', '0.5');
    //   const self = this;
    //   axios.get('/worldbattle/20182/last').then(res => {
    //     for (let i = 0; i < self.pets.length; i++) {
    //       self.pets[i].top = res.data.top[i];
    //       self.pets[i].round = res.data.round[i] ?
    //         res.data.round[i] : res.data.round.length ?
    //         '凉凉' : '筹备中';
    //     }
    //     $$('#fw').css('opacity', '1');
    //   }).catch(console.log);
    // },
    updateSW () {
      const self = this;
      if (caches && caches.keys) {
        caches.keys().then(cachenames => {
          let names = cachenames.map(i => i.split('-')[1]);
          if (!names.length) return;
          self.cards.push({
            title: '正在使用 PWA 版搞事学园',
            content: `当前使用的数据版本: ${names.join(', ')}`
          });
          self.calcSW(cachenames);
        });
      }
    },
    calcSW (names) {
      const self = this;
      for (let name of names) {
        caches.open(name).then(cache => {
          cache.keys().then(keys => {
            for (let key of keys) {
              cache.match(key).then(res => {
                res.arrayBuffer().then(ab => {
                  self.swSize.total += ab.byteLength;
                  addSize(self.swSize, ab.byteLength, key.url);
                });
              });
            }
          });
        });
      }
    },
  },
  filters: {
    byte2mb (byte) {
      if (typeof byte !== 'number') {
        byte = Number(byte);
        if (isNaN(byte)) return;
      }
      return parseFloat((byte / 1024 / 1024).toFixed(2));
    }
  },
  created () {
    // this.updatePets();
    this.updateSW();
  },
  mounted () {
    mdui.mutation();
  },
  updated () {
    mdui.mutation();
  },
});
function addSize (s, l, url) {
  if (typeof url !== 'string') return;
  if (url.indexOf('font') !== -1) return s.font += l;
  if (url.indexOf('image') !== -1) return s.image += l;
  if (url.indexOf('js') !== -1) return s.script += l;
  return s.other += l;
}
}
