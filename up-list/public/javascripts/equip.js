// comment first and last line for test
// ((Vue) => {
let user = {
  level:   { name: '等级', value: 380   },
  name:    { name: '昵称', value: '红豆'  },
  coin:    { name: '金币', value: 65536 },
  crystal: { name: '水晶', value: 8088  }
};
let equip = {
  top: {
    serial: { name: '编号',     value: 805                },
    name:   { name: '装备名',   value: '巴斯克维尔的猎犬' },
    stars:  { name: '星级',     value: 6                  },
    level:  { name: '等级',     value: 99                 },
    love:   { name: '亲密度',   value: 50                 },
    adds:   { name: '追加等级', value: 99                 },
    weight: { name: '负重',     value: 25                 }
  },
  awaken: true,
  type: '徽章',
  atk: 0,
  payload: 255
};
let type = ['服装', '徽章', '武器'];
let equipType = {
  '服装':          { '生命'  : 2000 },
  '徽章':          { '移速'  : 14.9 },
  '手枪-速射':     { '攻击力': 300,  '载弹量': 200, '射　速': 10   },
  '手枪-手炮':     { '攻击力': 3000, '载弹量': 20,  '射　速': 1.7  },
  '自动步枪':      { '攻击力': 400,  '载弹量': 300, '射　速': 10   },
  '霰弹-独头':     { '攻击力': 2500, '载弹量': 34,  '射　速': 1.7  },
  '霰弹-多头':     { '攻击力': 2500, '载弹量': 30,  '射　速': 1.7  },
  '狙击':          { '攻击力': 3000, '载弹量': 30,  '射　速': 4.8  },
  '单兵火箭':      { '攻击力': 2500, '载弹量': 24,  '射　速': 1.2  },
  '近战-刀剑':     { '攻击力': 800,  '载弹量': '-', '攻　速': 3.3  },
  '近战-电锯':     { '攻击力': 200,  '载弹量': '-', '攻　速': 10   },
  '喷雾-普通':     { '攻击力': '-',  '载弹量': 25,  '射　速': 2.4  },
  '喷雾-激活':     { '攻击力': '-',  '载弹量': 15,  '射　速': 2.4  },
  '喷雾-附魔':     { '攻击力': '-',  '载弹量': 20,  '射　速': 2.4  },
  '特殊':          { '攻击力': 800,  '载弹量': 200, '射　速': 5    },
  '投掷':          { '攻击力': 800,  '载弹量': 10,  '射　速': 4.8  },
  '放置-炮台':     { '攻击力': 0,    '载弹量': 3,   '射　速': 3.3  },
  '放置-远古兵器': { '攻击力': 2500, '载弹量': 10,  '射　速': 3.3  },
  '放置-人形':     { '攻击力': 2200, '载弹量': 9,   '射　速': 3.3  },
  '放置-地雷':     { '攻击力': 3000, '载弹量': 10,  '射　速': 3.3  },
  '放置-特殊':     { '攻击力': 0,    '载弹量': 8,   '射　速': 3.3  },
  '放置-诱导人形': { '生　命': 1,    '载弹量': 8,   '持　续': '8s' }
};

let app = new Vue({
  el: '#app',
  data: {
    user, equip, type, equipType,
    selectedType: '',
    selectedWeapon: '',
    selectedSeries: 'http://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/Series/Series00.png',
    addType: ''
  },
  computed: {
    selectedWeapon_() {
      if(this.selectedType == '武器') return this.selectedWeapon;
      else return '';
    },
    addon() {
      let adds = {};
      for (let k in this.equipType[this.selectedType]) {
        if (k == this.addType) adds[k] = this.equipType[this.selectedType][k] != '-';
        else adds[k] = false;
      }
      return adds;
    },
    allAdds() {
      return Number(this.equip.top.adds.value) + Number(this.equip.top.love.value);
    }
  },
  methods: {
    computedValue: function(val, key) {
      let rate = (key == '生命' ? 0.3 : 0.2);
      if (key == '射　速' || key == '攻　速') {
        return (val * (1 + this.allAdds * 0.002)).toFixed(1) + ' / 秒';
      } else if (key == '移速') {
        return +(this.allAdds * 0.1).toFixed(1) + '%';
      } else if (typeof val == 'string' && val.indexOf('s') != -1) {
        val = val.substring(0, val.indexOf('s'));
        return +(Math.floor(val * (1 + this.allAdds * rate * 0.01))) + 's';
      } else {
        return Math.floor(val * (1 + this.allAdds * rate * 0.01));
      }
    },
    generateArray: function (num) {
      if (isNaN(Number(num))) num = 6;
      else if (Number(num) > 10) num = 10;
      else if (Number(num) < 1) num = 1;
      return Array(Number(num));
    },
    toggleSelector: function (e) {
      if (e) e.stopPropagation();
      let ul = document.getElementById('series-selector');
      if (ul) ul.classList.toggle('show-selector');
    },
    hideSelector: function (e) {
      let ul = document.getElementById('series-selector');
      if (ul) ul.classList.remove('show-selector');
    },
    downloadImage: function (e) {
      let view = document.getElementById('equip-main');
      let serial = this.equip.top.serial.value;
      html2canvas(view, {
        width: 1024,
        height: 576,
        logging: false
      }).then(function (canvas) {
        // console.log('get canvas');
        let url = canvas.toDataURL();
        let img = document.createElement('a');
        img.setAttribute('href', url);
        img.setAttribute('download', serial + '.png');
        // console.log(`create ${img}`);
        // document.body.append(img);
        // console.log('appended');
        img.click();
        img.remove();
      });
    }
  }
});
document.onclick = function () {
  app.hideSelector();
}

// })(Vue);
