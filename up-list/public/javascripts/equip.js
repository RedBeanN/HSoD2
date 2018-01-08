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
  skills: [
    { name: 'N·S·N·D', 
      dmgType: '',
      description: '根据常驻移速加成提升全伤害 , 比例为#(100%) ; 并减少#(30%)的受到治疗效果',
      break: 0 },
    { name: 'Murder Rush',
      dmgType: '',
      description: '移速提升#(50%) , 侦探少女及海盗少女模式下拾取半径提升#(20)',
      break: 10 }
  ],
  awaken: true,
  type: '徽章',
  atk: 0,
  payload: 255,
  dmgType: ''
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
let dmgType = ['none', 'fire', 'light', 'physic', 'poison', 'power', 'snow'];
let imageStyle = {
  width: 64,
  height: 64,
  left: 0,
  top: 0
};
let widgets = {
  awakenImage: false,
  pinContainer: true,
  protectButton: true,
  unique: true
};

let app = new Vue({
  el: '#app',
  data: {
    user, equip, type, equipType, imageStyle, dmgType, widgets,
    selectedType: '',
    selectedWeapon: '',
    selectedSeries: 'http://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/Series/Series00.png',
    addType: '',
    tutorialText: '用#()标记技能描述中的可突破数值 , 在有突破等级时，#()内部的数值可以自动变色'
  },
  computed: {
    coin() {
      let coin = this.user.coin.value;
      if (coin.toString().length < 10) return coin;
      else return coin.toString().substring(0, coin.toString().length - 6) + '百万';
    },
    crystal() {
      let crystal = this.user.crystal.value;
      if (crystal.toString().length < 10) return crystal;
      else return crystal.toString().substring(0, crystal.toString().length - 6) + '百万';
    },
    formatDesc() {
      /* format description
         return array [desc1, desc2]
         desc : [text, data, text, data, ...]
         text can be empty, then text0 = ""    */
      let descArr = [];
      this.equip.skills.forEach(function (skill, index) {
        descArr[index] = [];
        let spl = skill.description.split(/#\(.*?\)/g);
        let skillData = [];
        if (spl.length > 1) skillData = (skill.description.match(/#\(.*?\)/g)).map(i => {
          return i.substring(2, i.length - 1);
        });
        for (let i in spl) {
          descArr[index].push(spl[i]);
          if(skillData[i]) descArr[index].push(skillData[i]);
        }
      });
      return descArr;
    },
    descHTML() {
      /* it's very danger using rawHTML with user input
         replace <>&" to &##;
      */
      let arr = this.formatDesc;
      let htmlArr = [];
      arr.forEach((desc, index) => {
        if (this.equip.skills[index].break) {
          let tmp = "";
          desc.forEach((text, i) => {
            text = text.replace(/[<>&"]/g, function (c) {
              return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c];
            });
            if (i % 2) tmp += `<span class="blue">${text}</span>`;
            else tmp += text;
          });
          htmlArr.push(tmp);
        } else htmlArr.push(desc.join(''));
      });
      return htmlArr;
    },
    skillsLength: {
      get: function () {
        return this.equip.skills.length;
      },
      set: function (newLength) {
        if (newLength < this.equip.skills.length) {
          this.equip.skills.splice(Number(newLength));
        } else {
          while (this.equip.skills.length < newLength) {
            this.equip.skills.push({
              name: '输入名字',
              description: '输入技能描述',
              dmgType: '',
              break: 0
            });
          }
        }
      }
    },
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
    },
    imageStyleObject() {
      return {
        width: this.imageStyle.width + 'px',
        height: this.imageStyle.height + 'px',
        transform: 'translate(-50%, -50%)',
        marginLeft: this.imageStyle.left + 'px',
        marginTop: this.imageStyle.top + 'px'
      }
    }
  },
  methods: {
    computedValue: function(val, key) {
      let rate = (key == '生命' ? 0.3 : 0.2);
      if (key == '射　速' || key == '攻　速') {
        return (val * (1 + this.allAdds * 0.002)).toFixed(1) + ' / 秒';
      } else if (key == '移速') {
        return +(this.allAdds * 0.1).toFixed(1);
      } else if (typeof val == 'string' && val.indexOf('s') != -1) {
        val = val.substring(0, val.indexOf('s'));
        return +(Math.floor(val * (1 + this.allAdds * rate * 0.01))) + 's';
      } else {
        return Math.floor(val * (1 + this.allAdds * rate * 0.01));
      }
    },
    toggleSelector: function (e) {
      // if (e) e.stopPropagation();
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
      html2canvas(view, { width: 1024, height: 576, logging: false })
        .then(function (canvas) {
          let img = document.createElement('a');
          img.setAttribute('href', canvas.toDataURL());
          img.setAttribute('download', serial + '.png');
          img.click();
        });
    }
  }
});
document.onclick = function () {
  app.hideSelector();
}

// })(Vue);
