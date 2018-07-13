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
      { url: '/cms/3',             name: '正式服公告备份' },
      { url: '/cms/18',            name: '测试服公告备份' },
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
            res.data.round[i] : res.data.round[i] === null ?
            '凉凉' : '筹备中';
        }
        $$('#fw').css('opacity', '1');
      }).catch(console.log);
    },
    openDrawer () {
      $$('#drawer').addClass('mdui-drawer-open');
    },
    closeDrawer (e) {
      if (e.target && e.target.getAttribute('id') === 'drawer') return;
      $$('#drawer').removeClass('mdui-drawer-open');
    }
  },
  created () {
    this.updatePets();
  }
});
}
