(() => {
const $$ = mdui.JQ;
$$('#back-to-index').remove();
$$('body').removeClass('mdui-drawer-body-left');
$$('.hide').removeClass('hide');
const errEquip = {
  'errorMsg': '可能是网络问题 , 也可能是该装备数据丢失',
};
const keyMap = {
  uid: 'ID',
  rarity: '星级',
  cost: '负重',
  maxlv: '最大等级',
  baseType: '装备类型',
  title: '装备名',
  desc: '装备描述',
  id: '图鉴编号',
  img: '装备图片',
  damageBase: '基础攻击力',
  damageAdd: '成长攻击力',
  damageMaxLv: '满级攻击力',
  atkBase: '基础攻击力',
  atkAdd: '成长攻击力',
  atkMaxLv: '满级攻击力',
  ammoBase: '基础载弹',
  ammoAdd: '成长载弹',
  ammoMaxLv: '满级载弹',
  fireRateBase: '基础攻速',
  fireRateAdd: '成长攻速',
  fireRateMaxLv: '满级攻速',
  criticalRate: '基础暴击率',
  critRate: '暴击率',
  multiShootLineNum: '弹道数',
  limitedNumber: '存在上限',
  countDownTimeBase: '基础存在时间',
  countDownTimeAdd: '成长存在时间',
  countDownTimeMaxLv: '满级存在时间',
  hpBase: '基础生命',
  hpAdd: '成长生命',
  hpMaxLv: '满级生命',
  posterId: '觉醒图',
};

const seriesMap = [[0,"无"],[1,"Start"],[2,"北欧"],[3,"电磁"],[4,"冥火"],[5,"星辰射手"],[6,"嗜切少女"],[7,"希腊"],[8,"普朗克"],[9,"V制式"],[10,"尼伯龙根"],[11,"角色"],[12,"绯狱"],[13,"里世界"],[14,"赫萝克"],[15,"凯尔特"],[16,"侦探少女"],[17,"天魔"],[18,"监察者"],[19,"萤火"],[20,"深海"],[21,"歌姬"],[22,"使魔"],[23,"血族"],[24,"bilibili"],[25,"Neta"],[26,"克苏鲁"],[27,"传说"],[28,"印度"],[29,"科学"],[30,"茜瓦利尔"],[31,"迷雾"],[32,"海盗少女"],[33,"华夏"],[34,"圣光"],[35,"梦魇"],[36,"弹丸论破"],[37,"童话"],[38,"雷电"],[39,"圣音"],[40,"永劫"],[41,"同构"],[42,"终末"],[43,"埃及"],[44,"艺术家"],[45,"逐火之蛾"],[46,"少女前线"],[47,"活化金属"],[48,"失落文明"],[49,"塔罗"]];

new Vue({
  el: '#app',
  data: {
    equips: {
      weapon: [],
      costume: [],
      passiveSkill: [],
      pet: [],
    },
    equip: {},
    showDetail: false,
    current: {
      type: 'all',
      page: 1,
      itemPerPage: 20,
    },
    searchInput: '',
    tabs: {
      'weapon': '武器',
      'costume': '衣服',
      'passiveSkill': '徽章',
      'pet': '使魔',
    },
    // mainProp: ['title', 'desc', 'errorMsg', 'rarity'],
    keyMap,
    hideItems: [
      'title', 'desc', 'errorMsg', 'rarity', 'img', 'id', 'decompose',
      'uid', 'damageType', 'seriesId', 'seriesText',
      'evolveFormula', 'awakenFormula',
    ],
    pets: [],
    characters: [],
    seriesFilters: [],
    seriesMap,
    filterDialog: null,
    characterOptions: [
      '傲娇', '元气', '偶像', '隐秘',
      '重击', '咒文', '爆裂', '装甲',
      '概念', '妖血', '幻影', '狂气',
      '裁决',
    ],
    characterAdds: {
      "元气": "增加能量属性伤害 (1% 3% 6% 10% 15%)",
      "傲娇": "增加电属性伤害 (1% 3% 6% 10% 15%)",
      "概念": "提升攻击速度 (1% 3% 6% 10% 15%)",
      "爆裂": "增加暴击伤害 (2% 5% 9% 14% 20%)",
      "重击": "增加物理属性伤害 (1% 3% 6% 10% 15%)",
      "装甲": "提升减伤 (2% 5% 9% 14% 20%)",
      "幻影": "提升闪避率 (2% 5% 9% 14% 20%)",
      "隐秘": "增加冰属性伤害 (1% 3% 6% 10% 15%)",
      "妖血": "增加常驻移速 (1% 3% 6% 10% 15%)",
      "狂气": "增加暴击率 (2% 5% 9% 14% 20%)",
      "咒文": "增加毒属性伤害 (1% 3% 6% 10% 15%)",
      "偶像": "增加火属性伤害 (1% 3% 6% 10% 15%)",
      "裁决": "提升全伤害 (2% 5% 9% 14% 20%)",
    },
    seriesFilteredEquips: [],
  },
  computed: {
    isEquip () {
      if (this.equip) {
        if ('ultraSkill' in this.equip || 'normalSkill1' in this.equip) return false;
        if (this.equip.id !== '0') return true;
      }
      return false;
    },
    all() {
      const all = [];
      for (let key in this.equips) {
        all.push(...this.equips[key]);
      }
      return all.sort((a, b) => a.id - b.id)
        .filter(val => val.title && val.title.includes(this.searchInput));
    },
    items() {
      if (this.current.type === 'all') return this.all;
      else return this.equips[this.current.type]
        .sort((a, b) => a.id - b.id)
        .filter(val => val.title && val.title.includes(this.searchInput));
    },
    petCharacters () {
      return this.pets.map(i => {
        if (!i.characters) return [i.img];
        return [i.img, ...i.characters.map(c => c.desc)];
      });
    },
    filteredPets () {
      // if (this.characters.length === 0) return this.petCharacters;
      return this.petCharacters.filter(i => {
        let isMapped = true;
        for (let char of this.characters) {
          if (!i.includes(char)) isMapped = false;
        }
        return isMapped;
      }).map(i => i[0]);
    },
    totalPages() {
      let ipp = this.current.itemPerPage;
      if (ipp < 1) ipp = 1;
      return Math.ceil(this.items.length / ipp);
    },
    pages() {
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
    itemsInPage() {
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
    filteredEquips () {
      return this.seriesFilteredEquips;
    },
  },
  methods: {
    async loadData(url) {
      return axios.get(url);
    },
    loadAll() {
      showLoading();
      this.loadData('v2/minify').then(res => {
        this.parseMinify(res.data);
        hideLoading();
      });
    },
    async loadPets () {
      showLoading();
      return this.loadData('v2/pet').then(res => {
        this.pets = res.data;
        hideLoading()
      });
    },
    parseMinify(data) {
      for (let key in data) {
        let arr = [];
        for (let item of data[key]) {
          let [uid, id, rarity, img, title] = item.split('$');
          arr.push({ uid, id, rarity, img, title, type: key });
        }
        this.$set(this.equips, key, arr);
      }
    },
    showEquipDetail(id, title, type) {
      if (!id || !title || !type) return;
      showLoading();
      // let t = type[0] + 'id';
      this.loadData(`v2/detail/${type}/uid/${id}`).then(res => {
        const eq = res.data;
        if (eq.desc) eq.desc = eq.desc.replace('#n', '\n');
        this.$set(this, 'equip', eq);
      }).catch(() => {
        this.$set(this, 'equip', errEquip);
      }).then(() => {
        const dialog = new mdui.Dialog($$('#dialog'), {
          history: false,
        });
        Vue.nextTick(() => {
          dialog.open();
          hideLoading();
        });
      })
    },
    showFilteredEquipDetail ({ uid, title }) {
      if (!uid || !title) return;
      showFilterLoading();
      this.loadData(`v2/detail/all/uid/${uid}`).then(({data}) => {
        if (data.desc) data.desc = data.desc.replace(/#n/g, '\n');
        this.$set(this, 'equip', data);
      }).catch(() => {
        this.$set(this, 'equip', errEquip);
      }).then(() => {
        hideFilterLoading();
        if (this.filterDialog !== null) {
          this.filterDialog.close();
          const dialog = new mdui.Dialog($$('#dialog'), {
            history: false,
          });
          $$('#dialog').one('closed.mdui.dialog', () => {
            this.filterDialog.open();
          });
          Vue.nextTick(() => {
            dialog.open();
          });
        }
      });
    },
    async showCharacterDialog () {
      await this.loadPets();
      (new mdui.Dialog('#pet-characters', {
        history: false,
      })).open();
    },
    showFilterDialog () {
      this.filterDialog = new mdui.Dialog('#filter', {
        history: false,
      });
      this.filterDialog.open();
    },
    formatDesc (desc) {
      return desc
        .replace(/#n/g, '\n')
        .replace(/#!ALB\(\d*\)/g, '')
        // .replace(/，|；/g, i => {
        //   return {
        //     '，': ' , ',
        //     '；': ' ; ',
        //   }[i];
        // })
        .replace(/[\d.]+\(.+?\)%?/g, t => {
          return `<span style='color: #34a4e4'>${t}</span>`
        });
    },
    percentage (_val) {
      const val = Number(_val);
      if (isNaN(val)) return _val;
      return parseFloat((val * 100).toPrecision(4)) + '%';
    },
    errorImg ($event) {
      $$($event.target).attr('src', '../error.jpg');
    },
    errorAwakenImg (val, $event) {
      val = Number(val);
      const url = '../images/awaken/' + (1000 + val) + '1.png'
      this.loadData(url)
      .then(res => {
        $$($event.target).attr('src', url);
      })
      .catch(() => {
        $$($event.target).attr('src', '../error.jpg')
      });
    },
    paging(opt) {
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
    selectTab(tab, e) {
      if (e) {
        $$('.mdui-tab-active').removeClass('mdui-tab-active');
        $$(e.target).addClass('mdui-tab-active');
      }
      this.current.type = tab;
      this.backToTop();
      this.paging(1);
    },
    backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  created() {
    if (window.location.href.endsWith('/'))
      window.location.href = window.location.href.replace(/\/$/, '')
    this.loadAll();
  },
  mounted() {
    mdui.mutation();
  },
  watch: {
    async seriesFilters (filters) {
      this.seriesFilteredEquips = [];
      if (filters.length === 0) return;
      showFilterLoading();
      await filters.forEach(async (filter, index) => {
        const {data} = await axios.get(`v2/detail/all/seriesId/${filter}`);
        // console.log(data);
        this.seriesFilteredEquips.push(...(data.map(i => {
          return {
            uid: i.uid,
            img: i.img,
            title: i.title,
          }
        })));
        this.seriesFilteredEquips = [...new Set(this.seriesFilteredEquips)].sort((a, b) => {
          return a.uid - b.uid;
        });
        if (index === filters.length - 1) hideFilterLoading();
      });
    },
    showDetail () {
      Vue.nextTick((new mdui.Dialog('#dialog', {history: false})).handleUpdate);
    },
    totalPages (val) {
      if (this.current.page > val) Vue.set(this.current, 'page', this.totalPages);
    },
  },
});

function showLoading() {
  $$('#progress').css('opacity', 1);
}

function hideLoading() {
  $$('#progress').css('opacity', 0);
}

function showFilterLoading() {
  $$('#filter-spinner').css('opacity', 1);
}
function hideFilterLoading() {
  $$('#filter-spinner').css('opacity', 0);
}
})();
