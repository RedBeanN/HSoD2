(() => {
// Talent Emulator By RedBeanN, 2018
const $$ = mdui.JQ;
$$('body').removeClass('mdui-drawer-body-left');

Vue.component('talent-detail', {
  render (h) {
    if (!this.detail) return;
    if (this.detail.includes('#TD')) {
      const splited = this.detail.split(/#TD\d+/);
      const matched = this.detail.match(/#TD(\d+)/g);
      if (!matched) return h(p, this.detail);
      const child = [];
      for (let i = 0; i < splited.length; i++) {
        child.push(h(
          'span',
          splited[i],
        ));
        if (matched[i]) {
          const id = matched[i].replace('#TD', '');
          child.push(h(
            'span',
            {
              on: {
                click: () => {
                  this.$emit('click', id);
                },
              },
              'class': {
                link: true,
              },
            },
            [this.talentmap ? this.talentmap[id] || id : id],
          ));
        }
      }
      return h(
        'p',
        {
          'class': 'talent-detail-text',
        },
        child,
      );
    } else {
      return h(
        'p',
        {
          'class': 'talent-detail-text',
        },
        this.detail,
      );
    }
  },
  props: {
    detail: String,
    talentmap: Object,
  },
});

const characterMap = {
  '4001': '琪亚娜·卡斯兰娜',
  '4002': '雷电芽衣',
  '4003': '布洛妮娅·扎伊切克',
  '4004': '无量塔姬子',
  '4005': '德莉莎·阿波卡利斯',
  '4006': '希儿·芙乐艾',
  '4007': '杏·玛尔',
  '4008': '蓬莱寺九霄',
  '4009': '伊瑟琳·利维休斯',
  '4010': '符华',
  '4011': '无色辉火',
  '4012': '西琳',
  '4013': '丽塔',
  '4014': '宁蒂',
  '4015': '迦娜',
  '4016': '芙兰',
  '4017': '菲米莉丝',
  '4018': '诗音',
};
const characterMapShort = {
  '4001': '琪亚娜',
  '4002': '芽衣',
  '4003': '布洛妮娅',
  '4004': '姬子',
  '4005': '德莉莎',
  '4006': '希儿',
  '4007': '杏',
  '4008': '九霄',
  '4009': '伊瑟琳',
  '4010': '符华',
  '4011': '辉火',
  '4012': '西琳',
  '4013': '丽塔',
  '4014': '宁蒂',
  '4015': '迦娜',
  '4016': '芙兰',
  '4017': '菲米莉丝',
  '4018': '诗音',
};
new Vue({
  el: '#app',
  data: {
    allTalents: {},
    characters: [],
    character: '',
    characterMap,
    characterMapShort,
    extra: [],
    title: '',
    detail: '',
    level: '',
    sprites: {},
    showExtra: false,
    linkDetail: null,
    detailDialog: null,
  },
  computed: {
    currentTalent () {
      return this.allTalents[this.character] || [];
    },
    talents () {
      return this.currentTalent.filter(i => i.uid < 999);
    },
    extraTalents () {
      return this.currentTalent.filter(i => i.uid > 999);
    },
    hasExtra () {
      return this.currentTalent.filter(i => i.uid > 999).length > 0;
    },
    sprite () {
      let s = {};
      for (let k in this.sprites) {
        let i = this.sprites[k];
        s[k] = {
          backgroundPosition: `${-32 * (i[0] - 1)}px ${-32 * (i[1] - 1)}px`
        }
      }
      return s;
    },
    talentMap () {
      const obj = {};
      this.currentTalent.forEach(i => {
        obj[i.uid] = i.title;
      });
      return obj;
    },
  },
  methods: {
    setCharacter(char) {
      if (this.characters.includes(char)) this.character = char;
      this.title = '';
      this.detail = '';
    },
    position (x, y) {
      return {
        left: 500 * x - 50 + 'px',
        top: 630 * (1 - y) - 110 + 'px',
      }
    },
    extraPosition (id) {
      let x = 0, y = 0;
      loop: for (let i = 0; i < this.extra.length; i++) {
        for (let j = 0; j < this.extra[i].length; j++) {
          if (parseInt(this.extra[i][j]) == parseInt(id)) {
            x = i, y = j;
            break loop;
          }
        }
      }
      return {
        left: (y + 1) * 0.2 * 400 + 'px',
        top: (x % 3 + 1) * 0.2 * 240 - 40 + 'px',
      }
    },
    showDetail (talent) {
      let {title, maxLvDesc, alb, maxLevel} = talent;
      this.title = title;
      this.level = maxLevel;
      let reg = new RegExp(`[\d{2}.]{${parseInt(alb / 2)}}`, 'g');
      this.detail = maxLvDesc.replace(reg, '$&\n');
    },
    showTalent (id) {
      for (const item of this.currentTalent) {
        if (item.uid === id) {
          this.linkDetail = item;
          break;
        }
      }
      if (this.linkDetail) {
        this.$nextTick(() => {
          if (!this.detailDialog) {
            this.detailDialog = new mdui.Dialog('#detail-dialog', {
              history: false,
              closeOnEsc () {},
            });
            this.detailDialog.open();
          } else {
            this.$nextTick(() => {
              this.detailDialog.handleUpdate();
              this.detailDialog.open();
            })
          }
        });
      }
    },
    loadAllData () {
      this.showLoading();
      axios.get('/talent/data')
      .then(res => {
        if (res.data) {
          this.$set(this, 'allTalents', res.data.talents);
          this.$set(this, 'extra', res.data.extra);
          this.characters = [];
          for (let key in res.data.talents) {
            this.characters.push(key);
          }
          this.character = this.characters[0];
        }
        this.hideLoading();
      });
      axios.get('/talent/sprite')
      .then(res => {
        if (res.data) this.$set(this, 'sprites', res.data);
      })
    },
    showLoading () {
      $$('#progress').css('opacity', '1');
    },
    hideLoading () {
      $$('#progress').css('opacity', '0');
    },
  },
  created () {
    this.loadAllData();
  },
  mounted () {
    $$('.hide').removeClass('hide');
  },
});
})();
