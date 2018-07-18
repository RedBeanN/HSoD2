window.onload = () => {
const $$ = mdui.JQ;
$$('#back-to-index').remove();
$$('body').removeClass('mdui-drawer-body-left');

const loadingCard = {
  title: 'Loading',
  subtitle: '加载中，请稍候'
};

const app = new Vue({
  el: '#app',
  data: {
    cards: [ loadingCard ],
    versions: [],
    searchInput: '',
    color: {
      '未处理': { color: '#1E40FE' },
      '已处理': { color: '#46CB47' },
      '进行中': { color: '#B212CE' },
      '不处理': { color: 'red'     },
    },
  },
  computed: {
    filteredCards () {
      if (this.searchInput === '') return this.cards;
      return this.cards.filter(item => {
        for (let i in item) {
          if (item[i].indexOf(this.searchInput) !== -1) return true;
        }
        return false;
      });
    }
  },
  methods: {
    loadVersions () {
      const self = this;
      return new Promise((resolve, reject) => {
        axios.get('/buglist/versions').then(res => {
          self.versions = res.data;
          resolve(res.data);
        });
      });
    },
    loadList (v, e) {
      const self = this;
      // this.cards = [loadingCard];
      showLoading();
      $$('.mdui-tab-active').removeClass('mdui-tab-active');
      $$(e.target).addClass('mdui-tab-active');
      axios.get('/buglist/data/' + v).then(res => {
        self.parseData(res.data, v);
        hideLoading();
      });
    },
    parseData (data, v) {
      let arr = [];
      if (v === '') {
        for (let i in data) arr.push(...data[i]);
        arr = arr.reverse();
      } else arr = data;
      this.cards = arr.map(item => {
        return {
          status: item.status,
          title: item.type,
          subtitle: `[${item.version}] ${item.startdate}`,
          content: item.title,
          id: item.id
        }
      });
    },
    backToHome () {
      showLoading();
      location.href = '/';
    },
  },
  created () {
    const self = this;
    this.loadVersions().then(ver => {
      // self.loadList(ver[0]);
      const e = {target: $$('.version-select')[0]};
      self.loadList(ver[0], e);
    });
  },
  mounted () {
    mdui.mutation();
  }
});

function showLoading () {
  $$('#progress').css('opacity', 1);
}
function hideLoading () {
  $$('#progress').css('opacity', 0);
}

};