window.onload = () => {
const $$ = mdui.JQ;
$$('#back-to-index').remove();
$$('body').removeClass('mdui-drawer-body-left');

const app = new Vue({
  el: '#app',
  data: {
    cards: [],
    searchInput: '',
  },
  computed: {
    filteredCards () {
      return this.cards;
    },
  },
  methods: {
    changeServer (server = 3) {
      showLoading();
      $$('.servers').removeClass('mdui-tab-active');
      const self = this;
      axios.get('/cms/data/' + server).then(res => {
        self.cards = data2array(res.data);
        $$('#server-' + server).addClass('mdui-tab-active');
        hideLoading();
      });
    }
  },
  created () {
    this.changeServer();
  },
  mounted () {
    mdui.mutation();
  }
});

function data2array (json) {
  const arr = [];
  for (let key in json) {
    if (key.indexOf('-') === -1) key = '0101-' + key;
    let [date, id] = key.split('-');
    date = date.substr(0, 2) + '-' + date.substr(2);
    arr.push({ id, date, title: json[key] });
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