let settings = {
  scale: 1,
};
((doc, win) => {
  const docEl = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = () => {
    let clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    // if (clientWidth>=640){
    //   docEl.style.fontSize = '100px';
    // } else {
    //   docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
    // }
    if (clientWidth > 1024) clientWidth = 1024;
    if (clientWidth <= 1024) settings.scale = clientWidth / 640;
    docEl.style.fontSize = clientWidth * 0.95 + 'px';
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
(() => {
const assetsHost = 'https://api-1256168079.cos.ap-chengdu.myqcloud.com';
const $$ = mdui.JQ;
$$('body').removeClass('mdui-drawer-body-left mdui-appbar-with-tab-larger').addClass('mdui-appbar-with-tab');
new Vue({
  el: '#app',
  data: {
    tabs: {
      '当前': 'round',
      '历史战绩': 'history',
    },
    current: {
      tab: 'round',
    },
    round: {},
    history: {},
    settings,
  },
  methods: {
    settab (tab) {
      this.current.tab = tab;
    },
    getPetImg (id) {
      return `${assetsHost}/images/pet-run/${id}.png`;
    },
    getPolygon (pet) {
      return `${(100 - pet.Speed) / 5 + 10},30 `+
             `30, ${(100 - pet.Satiety) / 5 +10} ` +
             `${(100 + pet.Technique) / 5 +10}, 30 ` +
             `30, ${(100 + pet.Energy) / 5 +10}`;
      // return '10,30 30,10 50,30 30,50';
    },
    getTime (stamp) {
      let d = new Date(Number(stamp + '000'));
      return d.toLocaleDateString() + ' ' + d.toTimeString().split(' ')[0];
    },
    showLoading () {
      $$('#progress').css('opacity', '1');
    },
    hideLoading () {
      $$('#progress').css('opacity', '0');
    },
  },
  async mounted () {
    const round = axios.get('https://api.redbean.tech/pet-run/round.json').then(res => {
      this.round = res.data;
    });
    const history = axios.get('https://api.redbean.tech/pet-run/history.json').then(res => {
      this.history = res.data;
    });
    Promise.all([round, history]).then(() => {
      this.hideLoading();
    });
  },
});
$$('.hide').removeClass('hide');
})();
