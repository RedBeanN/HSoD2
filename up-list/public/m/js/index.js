window.onload = () => {
const $$ = mdui.JQ;

const app = new Vue({
  el: '#app',
  data: {
    cards: [{
      title: '搞事学园移动端测试版发布啦 !',
      content: '目前功能还不完善 , 有任何意见建议欢迎发送到 me@hongshn.xyz ~'
    }, {
      title: '关于 PWA',
      content: '使用 https 访问本站 , 添加到主屏幕后就能开始使用 PWA 版本啦 !'
    }],
    pets: [
      { name: '普洛姆特', top: '', round: '' },
      { name: '冰铃',     top: '', round: '' },
      { name: '书包酱',   top: '', round: '' },
      { name: '茵朵兰',   top: '', round: '' },
      { name: '德哈琳',   top: '', round: '' },
      { name: '奥菲莉亚', top: '', round: '' },
    ],
    drawer: [
      { url: '/list/auto',         name: 'UP 记录' },
      { url: '/equip',             name: '装备模拟器' },
      { url: '/cms',               name: '公告记录' },
      { url: '/buglist',           name: '测试服 BUG 记录' },
      { url: '/worldbattle/20182', name: '阵营战记录' },
    ],
    drawerInst: null,
  },
  methods: {
    updatePets () {
      $$('#fw').css('opacity', '0.5');
      const self = this;
      axios.get('/worldbattle/20182/last').then(res => {
        for (let i = 0; i < self.pets.length; i++) {
          self.pets[i].top = res.data.top[i];
          self.pets[i].round = res.data.round[i] ?
            res.data.round[i] : res.data.round.length ?
            '凉凉' : '筹备中';
        }
        $$('#fw').css('opacity', '1');
      }).catch(console.log);
    },
    updateSW () {
      const self = this;
      axios.get('/swVersions').then(res => {
        let versions = res.data;
        if (Array.isArray(versions)) versions = versions.map(i => {
          return i.split('-')[1];
        });
        else alert('无法识别的 Service Worker 版本:', versions);
        self.cards.pop();
        self.cards.push({
          title: '正在使用 PWA 版搞事学园',
          content: `当前使用的数据版本: ${versions}`
        })
      })
    },
  },
  created () {
    this.updatePets();
    this.updateSW();
  },
  mounted () {
    mdui.mutation();
  }
});
}
