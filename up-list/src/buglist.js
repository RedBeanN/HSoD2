(() => {
const $$ = mdui.JQ;
$$('#back-to-index').remove();
$$('body').removeClass('mdui-drawer-body-left');

const app = new Vue({
  el: '#app',
  data: {
    cards: [],
    versions: [],
    types: ['全部', '装备', '常规', '活动', '报错', '兼容', '意见'],
    searchInput: '',
    typeInput: '',
    color: {
      '未处理': { color: '#1E40FE' },
      '已处理': { color: '#46CB47' },
      '进行中': { color: '#B212CE' },
      '不处理': { color: 'red'     },
    },
    statusMap: {
      '1': '未处理',
      '2': '不处理',
      '3': '已处理',
      '4': '进行中',
    },
    tagMap: {
      '1': "装备",
      '2': "活动",
      '3': "意见",
      '4': "常规",
      '5': "报错",
      '6': "兼容",
      '33': '活动',
    },
    current: {
      status: 'status',
      title: 'title',
      subtitle: 'subtitle',
      content: 'content',
      id: 'id',
      detail: '<pre></pre>',
      images: [],
    },
    currentBtn: '干掉繁体字!',
    disableT2s: false,
  },
  computed: {
    filteredCards () {
      // if (this.searchInput === '') return this.cards;
      this.cards.sort((a, b) => b.id - a.id);
      return this.cards.filter(item => {
        if (item.title && item.title.indexOf(this.typeInput) === -1) return false;
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
        axios.get('https://api.redbean.tech/buglist/list').then(res => {
          let vers = [];
          if (res && res.data) vers = res.data.map(i => i.name);
          self.versions = [...vers];
          resolve(vers);
        });
      });
    },
    loadList (v, e) {
      const self = this;
      v = v === '全部' ? '' : v;
      // this.cards = [loadingCard];
      showLoading();
      $$('.mdui-tab-active.version-select').removeClass('mdui-tab-active');
      $$(e.target).addClass('mdui-tab-active');
      axios.get('https://api.redbean.tech/buglist/' + v).then(res => {
        self.parseData(res.data, v);
        self.backToTop();
        hideLoading();
      });
    },
    filterType (t, e) {
      this.typeInput = t === '全部' ? '' : t;
      $$('.mdui-tab-active.type-select').removeClass('mdui-tab-active');
      $$(e.target).addClass('mdui-tab-active');
      this.backToTop();
    },
    parseData (data, v) {
      let arr = [];
      if (v === '') {
        for (let i in data) arr.push(...data[i]);
        arr = arr.reverse();
      } else arr = data;
      this.cards = arr.map(item => {
        return {
          status: this.statusMap[item.status],
          title: this.tagMap[item.type] || '常规',
          subtitle: `[${item.version}] ${item.startdate}`,
          content: item.title,
          id: item.id,
          detail: item.content,
          images: item.images,
        }
      });
    },
    getT2S (text) {
      return axios.get(
        encodeURI(`/convert/t2s?text=${text.replace(/&nbsp;/, ' ').replace(/\+/g, '^plus^')}`)
      );
    },
    t2s (cid, content, e) {
      showLoading();
      $$(e.target).text('正在干掉...');
      axios.get(
        encodeURI(`/convert/t2s?text=${content.replace(/\+/g, '^plus^')}`)
      ).then(res => {
        $$(`#card-${cid}`).text(res.data.replace(/\^plus\^/g, '+'));
        $$(e.target).text('干掉啦 !').attr('disabled', '');
      }).catch(_ => {
        $$(e.target).text('失败了...');
        setTimeout(() => {
          $$(e.target).text('再来一次 ?');
        }, 1000);
      }).then(_ => {
        hideLoading();
      });
    },
    t2sCurrent () {
      this.currentBtn = '正在干掉...';
      this.getT2S(this.current.content).then(async content => {
        this.current.content = content.data.replace(/\^plus\^/g, '+');
        if (!this.current.detail || this.current.detail.length === 0) return;
        const results = this.current.detail.match(/<p>[\s\S]*?<\/p>/g);
        if (results === null) return;
        for (let r of results) {
          if (r.includes('img')) continue;
          const res = await this.getT2S(r);
          this.current.detail = this.current.detail.replace(r, res.data).replace(/\^plus\^/g, '+');
        }
      }).then(() => {
        this.currentBtn = '干掉啦!';
        this.disableT2s = true;
      }).catch(() => {
        this.currentBtn = '失败了...';
        const self = this;
        setTimeout(() => {
          self.currentBtn = '再来一次?'
        }, 1000);
      });
    },
    showDetail (c) {
      this.currentBtn = '干掉繁体字!';
      this.disableT2s = false;
      this.$set(this, 'current', { ...c });
      this.$nextTick(() => {
        (new mdui.Dialog('#detail-dialog', {
          history: false,
        })).open();
      });
    },
    backToTop () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  created () {
    const self = this;
    this.loadVersions().then(ver => {
      // self.loadList(ver[0]);
      self.loadList(ver[0], {target: $$('.version-select')[0]});
      self.filterType(self.types[0], {target: $$('.type-select')[0]});
    });
  },
  mounted () {
    mdui.mutation();
    $$('.cards').css('display', 'block');
  }
});

function showLoading () {
  $$('#progress').css('opacity', 1);
}
function hideLoading () {
  $$('#progress').css('opacity', 0);
}

})();
