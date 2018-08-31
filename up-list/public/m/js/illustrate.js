(() => {
const $$ = mdui.JQ;
$$('#back-to-index').remove();
$$('body').removeClass('mdui-drawer-body-left');
$$('.hide').removeClass('hide');

const app = new Vue({
  el: '#app',
  data: {
    equips: {
      weapon: [],
      costume: [],
      passive_skill: [],
    },
    equip: {
      "id": "3",
      "type": "weapon",
      "max_lv": "35",
      "cost": "6",
      "display_image": "3",
      "display_title": "M617左轮手枪",
      "rarity": "4",
      "empty_star": "1",
      "display_ammo": "124",
      "display_firerate": "10",
      "display_damage": "150",
      "display_base_type": "手枪-速射",
      "display_prop1_title": "暴击",
      "display_prop1_desc": "增加15%该武器暴击率"
    },
    current: {
      type: 'all',
      page: 1,
      itemPerPage: 20,
    },
    searchInput: '',
    tabs: {
      'weapon': '武器',
      'costume': '衣服',
      'passive_skill': '徽章',
    }
  },
  computed: {
    items_ () {
      const arr = [];
      if (this.current.type !== 'all') arr.push(...this.equips[this.current.type]);
      else for (let type in this.equips) {
        arr.push(...this.equips[type]);
      }
      return this.parseEquips(arr);
    },
    totalPages () {
      let ipp = this.current.itemPerPage;
      if (ipp < 1) ipp = 1;
      return Math.ceil(this.items.length / ipp);
    },
    pages () {
      let pagenum = this.totalPages;
      if (pagenum < 6) {
        let arr = [];
        for (let i = 1; i <= pagenum; i++) arr.push(i);
        return arr;
      }
      if (this.current.page < 1) this.current.page = 1;
      if (this.current.page > pagenum) this.current.page = pagenum;
      let p = this.current.page;
      if (p < 3) return [1, 2, 3, '...', pagenum];
      if (p > pagenum - 2) return [1, '...', pagenum - 2, pagenum - 1, pagenum];
      else return ['...', p - 1, p, p + 1, '...'];
    },
    itemsInPage () {
      let page = this.current.page;
      let ipp = this.current.itemPerPage;
      if (!page) page = 1;
      if (!ipp) ipp = 1;
      let start = (page - 1) * ipp;
      const items = [];
      for (let i = start; i < start + ipp; i++) {
        if (this.items[i]) items.push(this.items[i]);
      }
      this.backToTop();
      return items;
    },
    items () {
      if (this.searchInput === '') return this.items_;
      const arr = [];
      for (let i of this.items_) {
        if (
          i.name &&
          i.name.indexOf(this.searchInput) !== -1
        ) arr.push(i);
      }
      return arr;
    },
  },
  watch: {
    'current.itemPerPage' (val, oldVal) {
      if (!val) val = 1;
      if (!oldVal) oldVal = 1;
      console.log(val, oldVal);
      if (val !== oldVal) {
        let page = this.current.page;
        let itemnum = (page - 1) * oldVal + 1;
        this.current.page = Math.ceil(itemnum / val);
      }
    },
    'current.totalPage' (val) {
      if (this.current.page > val) this.current.page = val;
    },
  },
  methods: {
    parseEquips (equips) {
      const arr = [];
      equips.forEach(equip => {
        const data = equip.split('$');
        arr.push({
          id: intToString(data[0], 3),
          stars: parseInt(data[1]),
          name: data[2],
        });
      });
      return arr;
    },
    paging (opt) {
      let num = parseInt(opt);
      let page = 1;
      if (!isNaN(num)) page = num;
      else switch (opt) {
        case 'first':
          page = 1;
          break;
        case 'last':
          page = this.totalPages;
          break;
        case 'pre':
          page = this.current.page - 1;
          break;
        case 'next':
          page = this.current.page + 1;
          break;
      }
      if (page < 1 || page > this.totalPages) return;
      else return this.current.page = page;
    },
    selectTab (tab, e) {
      if (e) {
        $$('.mdui-tab-active').removeClass('mdui-tab-active');
        $$(e.target).addClass('mdui-tab-active');
      }
      this.current.type = tab;
      this.backToTop();
    },
    loadData () {
      showLoading();
      axios.get('illustrate/data/minify').then(res => {
        this.equips = res.data;
        hideLoading();
      }).catch(e => {
        console.error(e);
      })
    },
    showDetail (id) {
      showLoading();
      axios.get('illustrate/details/' + parseInt(id)).then(res => {
        this.equip = res.data;
        this.equip.id = id;
        const dialog = new mdui.Dialog($$('#dialog'));
        Vue.nextTick(_ => {
          dialog.open();
          hideLoading();
        });
      });
    },
    backToTop () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  created () {
    this.loadData();
  },
  mounted () {
    mdui.mutation();
  }
});

function intToString (n, k) {
  let str = n.toString();
  let result = '';
  for (let i = 0; i < k - str.length; i++) {
    result += '0';
  }
  return result + str;
}
function showLoading () {
  $$('#progress').css('opacity', 1);
}
function hideLoading () {
  $$('#progress').css('opacity', 0);
}

})();
