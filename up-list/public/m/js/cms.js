window.onload = () => {
const $$ = mdui.JQ;
$$('#back-to-index').remove();
$$('body').removeClass('mdui-drawer-body-left');

const app = new Vue({
  el: '#app',
  data: {
    cards: [],
    searchInput: '',
    currentServer: 3,
    isReadingDetail: false,
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
    },
  },
  methods: {
    changeServer (server = 3) {
      /**
       * load cms data for server
       */
      showLoading();
      $$('.servers').removeClass('mdui-tab-active');
      const self = this;
      axios.get('/cms/data/' + server).then(res => {
        self.cards = data2array(res.data);
        $$('#server-' + server).addClass('mdui-tab-active');
        self.currentServer = server;
        mdui.mutation();
        self.backToTop();
        hideLoading();
      });
    },
    read (tid) {
      showLoading();
      const dialog = new mdui.Dialog($$('#dialog'));
      axios.get(`/cms/${this.currentServer}/${tid}`, {
        responseType: 'document'
      }).then(res => {
        if (res.data && res.data.body) {
          $$('#dialog-content').empty().append(res.data.body.children);
        }
      }).catch(e => {
        $$('#dialog-content').empty().append(e.message ? e.message : e);
      }).then(_ => {
        dialog.open();
        hideLoading();
      });
    },
    backToTop () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  created () {
    this.changeServer();
  },
  mounted () {
    mdui.mutation();
    $$('.cards').css('display', 'block');
  }
});

function data2array (json) {
  const arr = [];
  for (let key in json) {
    if (key.indexOf('-') === -1) key = '0101-' + key;
    let [date, id] = key.split('-');
    date = date.substr(0, 2) + '-' + date.substr(2);
    arr.push({ id, date, key, title: json[key] });
  }
  return arr.sort((a, b) =>  b.id - a.id);
}

function showLoading () {
  $$('#progress').css('opacity', 1);
}
function hideLoading () {
  $$('#progress').css('opacity', 0);
}

};