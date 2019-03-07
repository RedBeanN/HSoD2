((doc, win) => {
  const docEl = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = () => {
    settings.scale = 1;
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

const BSearch = (list, cpfn) => {
  let low = 0;
  let high = list.length - 1;
  while (low <= high) {
    let mid = parseInt((low + high) / 2);
    let cp = 0;
    if (typeof cpfn === 'function') cp = cpfn(list[mid]);
    else cp = cpfn - list[mid];
    if (cp === 0) return mid;
    else if (cp > 0) low = mid + 1;
    else if (cp < 0) high = mid - 1;
    else return -1;
  }
}
let settings = {
  scale: 1,
};
(() => {
const assetsHost = 'https://api-1256168079.cos.ap-chengdu.myqcloud.com';
const iconHost = 'https://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png';
const $ = mdui.JQ;
$('body').removeClass('mdui-drawer-body-left mdui-appbar-with-tab-larger').addClass('mdui-appbar-with-tab');
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
    pets: [],
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
    getShortTime (stamp) {
      let d = new Date(Number(stamp + '000'));
      return `${d.getDate()}日${d.getHours()}时`
    },
    getPetDetail (id) {
      const pos = BSearch(this.pets, item => id - item.uid);
      if (pos === undefined || !this.pets[pos]) return null;
      return this.pets[pos];
    },
    getPetIconImg (id) {
      const detail = this.getPetDetail(id);
      if (detail !== null && detail.img) {
        return `${iconHost}/${detail.img}.png`;
      } else return '/error.png';
    },
    showLoading () {
      $('#progress').css('opacity', '1');
    },
    hideLoading () {
      $('#progress').css('opacity', '0');
    },
  },
  async mounted () {
    const pets = await axios.get('/illustrate/v2/pet');
    this.pets = pets.data;
    const round = axios.get('https://api.redbean.tech/pet-run/round.json').then(res => {
      this.round = res.data;
    });
    const history = axios.get('https://api.redbean.tech/pet-run/history.json').then(res => {
      this.history = res.data;
    });
    Promise.all([round, history])
    .then(this.hideLoading);
  },
});
$('.hide').removeClass('hide');
})();
