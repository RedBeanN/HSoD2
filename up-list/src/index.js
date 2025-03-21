(() => {
const $$ = mdui.JQ;
$$('body').removeClass('mdui-appbar-with-tab-larger');
$$('body').addClass('mdui-appbar-with-tab');

const app = new Vue({
  el: '#app',
  data: {
    card: {
      title: '正在使用 PWA 版搞事学园',
      // hint: '如需使用装备模拟器的在线字体，请在此页面等待【字体】缓存更新为 10MB 以上',
      hint: '搞事学园采用缓存+后台更新的方式，页面有更新时先渲染缓存的页面，再后台更新，在下一次访问同一页面时才使用更新版，以达成即时访问、无痕更新的效果，如果发现访问的页面版本较旧，请尝试刷新页面',
      content: '',
    },
    balor: {
      // user settings
      crate: 150,
      cadds: 180,
      minus: 42,
      minmi: 150,
      wz: '1',
      // auto computes
      lowRate: 0,
      lowProb: 0,
      highRate: 0,
      highProb: 0,
      exp: 0,
    },
    drawer: [
      { url: '/list',          name: 'UP 记录',         icon: 'date_range' },
      { url: '/equip',         name: '装备模拟器',      icon: 'pages' },
      { url: '/cms',           name: '公告记录',        icon: 'format_list_bulleted' },
      { url: '/buglist',       name: '测试服 BUG 记录', icon: 'bug_report' },
      { url: '/gacha',         name: '扭蛋模拟器',      icon: 'casino' },
      { url: '/illustrate/v3', name: '装备图鉴',        icon: 'art_track' },
      // { url: '/innerWorld',    name: '里塔助手',        icon: 'book' },
      { url: '/talent',        name: '圣痕一览',        icon: 'all_out' },
      // { url: '/calendar',      name: '崩坏课程表',      icon: 'event_note'},
      // { url: '/roguelike',     name: '伽蓝之末排名',    icon: 'multiline_chart'},
      { url: '/worldbattle/20242',name: '阵营战记录',   icon: 'multiline_chart'},
      // { url: '/pet-run',       name: '使魔Formula',     icon: 'pets' },
      // { url: '/bot.html',      name: '搞事Bot食用指南', icon: 'android' },
    ],
    drawerInst: null,
    swSize: {
      total: 0,
      font: 0,
      image: 0,
      script: 0,
      other: 0,
    },
    contributeStatus: 0,
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
      let highProb = toFloat(crate - i + 1);
      let lowProb = toFloat(1 - highProb);
      this.balor.highProb = toFloat(highProb * 100);
      this.balor.lowProb = toFloat(lowProb * 100);
      this.balor.highRate = toFloat(cris.reduce((pre = 1, cur) => pre * cur));
      this.balor.lowRate = toFloat(this.balor.highRate / cris[cris.length - 1])
      this.balor.exp = toFloat(
        (lowProb * this.balor.lowRate +
        highProb * this.balor.highRate)* 100
      );
      return this.balor.highRate + ' 倍';
    }
  },
  methods: {
    updateSW () {
      const self = this;
      if (caches && caches.keys) {
        caches.keys().then(cachenames => {
          let names = cachenames.map(i => i.split('-')[1]);
          if (!names.length) return;
          self.card.content = `当前使用的数据版本: ${names.join(', ')}`;
          self.calcSW(cachenames);
        });
      }
    },
    async calcSW(names) {
      const swSize = {
        total: 0,
        font: 0,
        image: 0,
        script: 0,
        other: 0,
      };
      for (let name of names) {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        for (let key of keys) {
          const res = await cache.match(key);
          const ab = await res.arrayBuffer();
          swSize.total += ab.byteLength;
          addSize(swSize, ab.byteLength, key.url);
        }
      }
      this.swSize = swSize;
    },
    dontShowContribute () {
      window.localStorage.setItem('contribute-status', 2);
      this.contributeStatus = 2;
    },
  },
  filters: {
    byte2mb (byte) {
      if (typeof byte !== 'number') {
        byte = Number(byte);
        if (isNaN(byte)) return;
      }
      return toFloat(byte / 1024 / 1024);
    }
  },
  created () {
    // this.updatePets();
    this.updateSW();
    setInterval(() => {
      this.updateSW();
    }, 5000);
    let contribute = window.localStorage.getItem('contribute-status');
    if (contribute !== null) {
      this.contributeStatus = contribute;
      if (contribute == 0) window.localStorage.setItem('contribute-status', 1);
    }
    else {
      this.contributeStatus = 0;
      window.localStorage.setItem('contribute-status', 0);
    }
  },
  mounted () {
    mdui.mutation();
    $$('.hide').removeClass('hide');
  },
  updated () {
    mdui.mutation();
    $$('.hide').removeClass('hide');
  },
});
function addSize (s, l, url) {
  if (typeof url !== 'string') return;
  if (url.indexOf('font') !== -1) return s.font += l;
  if (url.indexOf('image') !== -1) return s.image += l;
  if (url.indexOf('js') !== -1) return s.script += l;
  return s.other += l;
}
function toFloat (f) {
  if (typeof f !== 'number') {
    try {
      f = Number(f);
      if (isNaN(f)) return 0;
    } catch (_) {
      return 0;
    }
  }
  return parseFloat(f.toFixed(4));
}
})();
