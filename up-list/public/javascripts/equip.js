//import('icons.min.js');
//import('vue.min.js');
//import('readme.min.js');

(() => {
'use strict';

// presets
let user = {
  level:   { name: '等级', value: 380        },
  name:    { name: '昵称', value: '搞事学园' },
  coin:    { name: '金币', value: 65536      },
  crystal: { name: '水晶', value: 8088       }
};
let equip = {
  top: {
    serial: { name: '编号',     value: 2962        },
    name:   { name: '装备名',   value: '镜花水月' },
    stars:  { name: '星级',     value: 7           },
    level:  { name: '等级',     value: 99          },
    love:   { name: '亲密度',   value: 99          },
    adds:   { name: '追加等级', value: 99          },
    weight: { name: '负重',     value: 50          },
  },
  skills: [
    { name: '水中月', 
      dmgType: 'none',
      description: '每#(2.8)秒充能一层能抵挡一次攻击的屏障 , 最多充能8层',
      break: 2 },
    { name: '镜中花',
      dmgType: 'none',
      description: '抵挡攻击后 , 增加#(660)点武器攻击力 , 提升#(159%)对攻击者造成的全伤害 , 持续15秒 , \\n并使其陷入时停状态 , 持续3秒',
      break: 3 },
  ],
  awaken: true,
  type: '徽章',
  dmgType: 'none',
};
let equipType = {
  '服装':          { '生命'  : 2000 },
  '徽章':          { '移速'  : 14.9 },
  '手枪-速射':     { '攻击力': 300,  '载弹量': 200, '射　速': 10   },
  '手枪-手炮':     { '攻击力': 3000, '载弹量': 20,  '射　速': 1.7  },
  '自动步枪':      { '攻击力': 400,  '载弹量': 300, '射　速': 10   },
  '霰弹-独头':     { '攻击力': 2500, '载弹量': 34,  '射　速': 1.7  },
  '霰弹-多头':     { '攻击力': 500,  '载弹量': 30,  '射　速': 1.7, '弹道数': 5  },
  '狙击':          { '攻击力': 3000, '载弹量': 30,  '射　速': 4.8  },
  '单兵火箭':      { '攻击力': 2500, '载弹量': 24,  '射　速': 1.2  },
  '近战-刀剑':     { '攻击力': 800,  '载弹量': '-', '攻　速': 3.3  },
  '近战-电锯':     { '攻击力': 200,  '载弹量': '-', '攻　速': 10   },
  '喷雾-普通':     { '攻击力': '-',  '载弹量': 25,  '射　速': 2.4  },
  '喷雾-激活':     { '攻击力': '-',  '载弹量': 15,  '射　速': 2.4  },
  '喷雾-附魔':     { '攻击力': '-',  '载弹量': 20,  '射　速': 2.4  },
  '特殊':          { '攻击力': 800,  '载弹量': 200, '射　速': 5    },
  '投掷':          { '攻击力': 800,  '载弹量': 10,  '射　速': 4.8,  '弹跳次数': 3  },
  '放置-炮台':     { '攻击力': 0,    '载弹量': 3,   '射　速': 3.3,  '放置上限': 1  },
  '放置-远古兵器': { '攻击力': 2500, '载弹量': 10,  '射　速': 3.3,  '放置上限': 1  },
  '放置-人形':     { '攻击力': 2200, '载弹量': 9,   '射　速': 3.3,  '放置上限': 3  },
  '放置-地雷':     { '攻击力': 3000, '载弹量': 10,  '射　速': 3.3,  '放置上限': 1  },
  '放置-特殊':     { '攻击力': 0,    '载弹量': 8,   '射　速': 3.3,  '放置上限': 1  },
  '放置-诱导人形': { '生　命': 1,    '载弹量': 8,   '持　续': '8s', '放置上限': 1 },
};
let dmgType = {
  'none': '无', 'physic': '物理', 'power': '能量',
  'snow': '冰', 'fire': '火', 'light': '电', 'poison': '毒' };
let imageStyle = {
  width: 64,
  height: 64,
  left: 0,
  top: 0,
};
let awakenStyle = {
  width: 640,
  height: 0,
  left: 0,
  top: -170,
};
let widgets = {
  awakenImage: false,
  pinContainer: true,
  protectButton: true,
  unique: true,
};
let texts = {
  unique: '唯一装备 , 带多件无效哟~',
  tutorial: '用#()标记技能描述中的可突破数值 , #()内部的数值可以自动变色 ; 用 \\n 可以强制换行',
  sizeCtrl: '移动滑块调整图片大小和位置 , 数值范围不足时可以通过右侧输入框手动输入',
  download: '点击 [保存图片] 自动生成并保存做好的图片 , 生成图片需要几秒钟的时间 , 请耐心等待 . (由于 html2canvas 的限制 , 部分控件可能会有绘制错误)',
};

let app = new Vue({
  el: '#app',
  data: {
    user, equip, equipType, imageStyle, dmgType, widgets, texts,
    downloading: false,
    selectedType: '徽章',
    idol: false,
    selectedWeapon: '',
    selectedSeries: icons.series['series00.png'],
    addType: '移速',
    pinImage: { src: '', exist: false },
    useSpecialStar: false,
    readme,
  },
  created () {
    this.selectedSeries = this.series[2];
    this.widgets.awakenImage = true;
  },
  watch: {
    'widgets.awakenImage' (val) {
      if (val) {
        this.widgets.pinContainer = false;
        this.imageStyle = awakenStyle;
      } else {
        if (!this.pinImage.src) this.widgets.pinContainer = true;
        this.imageStyle = imageStyle;
      }
    },
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
    watermark () {
      let wm = true;
      this.equip.skills.forEach(function (skill) {
        if (skill.description.startsWith('$rmwm;')) wm = false;
      });
      return wm;
    },
    formatDesc() {
      /* format description
         return array [desc1, desc2]
         desc : [text, data, text, data, ...]
         text can be empty, then text0 = ""    */
      let descArr = [];
      this.equip.skills.forEach(function (skill, index) {
        descArr[index] = [];
        let skillDesc = skill.description;
        if (skillDesc.startsWith('$rmwm;')) skillDesc = skillDesc.substr(6);
        let spl = skillDesc.split(/#\(.*?\)/g);
        let skillData = [];
        if (spl.length > 1) skillData = (skillDesc.match(/#\(.*?\)/g)).map(i => {
          return i.substring(2, i.length - 1);
        });
        for (let i in spl) {
          descArr[index].push(spl[i]);
          if(skillData[i] || skillData[i] == '') descArr[index].push(skillData[i]);
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
        let tmp = "";
        desc.forEach((text, i) => {
          text = text.replace(/[，；]/g, function (c) {
            return {
              '，': ' , ', '；': ' ; ',
              // '“': '『', '‘': '「',
              // '”': '』', '’': '」',
            }[c];
          });
          text = text.replace(/[<>&"]/g, function (c) {
            return {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'}[c];
          });
          text = text.replace('\\n', '<br />');
          if (i % 2) tmp += `<span class="blue">${text}</span>`;
          else tmp += text;
        });
        htmlArr.push(tmp);
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
              dmgType: 'none',
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
        height: this.imageStyle.height == '0' ? 'auto' : (this.imageStyle.height + 'px'),
        marginLeft: this.imageStyle.left - this.imageStyle.width * 0.5 + 'px',
        marginTop: this.imageStyle.top - this.imageStyle.height * 0.5 + 'px'
      };
    },
    pinContainerSrc() {
      let img = 'pin-container';
      if (this.idol) img = 'idol';
      if (this.equip.top.stars.value < 7) return `/images/${img}-6s.png`;
      else return `/images/${img}-7s.png`;
    },
    starSrc() {
      if (!this.useSpecialStar) return '/images/star-full.png';
      else return '/images/star-full-special.png';
    },
    series () {
      let series = [];
      // series.push(icons.series['series00.png']);
      for (let i = 0; i < 48; i++) {
        let index = +i;
        if (i < 10) index = '0' + index;
        // series.push(icons.series[`series${index}.png`]);
        series.push(`https://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/Series/Series${index}.png`)
      }
      series.push(icons.series['sakura.png']);
      return series;
    },
    dmgTypeSrc() {
      const src = [];
      for (let i in this.dmgType) {
        src[i] = `https://static.image.mihoyo.com/hsod2_webview/images/broadcast_top/equip_icon/png/Type/${i}.png`
      }
      return src;
    },
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
    toggleSelector: function (e) {
      // if (e) e.stopPropagation();
      let ul = document.getElementById('series-selector');
      if (ul) ul.classList.toggle('show-selector');
    },
    hideSelector: function (e) {
      let ul = document.getElementById('series-selector');
      if (ul) ul.classList.remove('show-selector');
    },
    updatePinImage: function (e) {
      let pinImage = this.pinImage;
      if (e && e.target && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
          pinImage.exist = true;
          pinImage.src = this.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        pinImage.exist = false;
        pinImage.src = '';
      }
    },
    // downloadImage: function (e) {
    //   this.downloading = true;
    //   let view = document.getElementById('equip-main');
    //   let top =  this.equip.top;
    //   html2canvas(view, { width: 1024, height: 576, logging: false })
    //     .then(function (canvas) {
    //       let img = document.createElement('a');
    //       img.setAttribute('href', canvas.toDataURL());
    //       img.setAttribute('download', `${top.serial.value}-${top.name.value}.png`);
    //       img.click();
    //       app.downloading = false;
    //     });
    // },
    toggleLock() {
      $$('lock').classList.toggle('unlock');
    },
    selectType(e) {
      let v = e.target.value;
      if (v === '服装' || v === '徽章' || v.indexOf('喷雾') !== -1) {
        this.equip.dmgType = 'none';
      }
      if (v !== '') {
        let t = this.equipType[v];
        for (let i in t) return this.addType = i;
      }
    },
  },
  filters: {
    username (val) {
      return val.substring(0, 8);
    },
    formatNumber (val) {
      if (val.toString().length < 10) return val;
      else if (val.toString().length < 13) return val.toString().substring(0, val.toString().length - 6) + '百万';
      else return ' ? ? ? ';
    },
    serialNumber (val) {
      return val.toString().substring(0, 5);
    },
    name (val) {
      return val.substring(0, 12);
    }
  }
});

document.onclick = function () {
  // handle selector display
  app.hideSelector();
};

$$('loading-page').remove();
$$('app').style.display = 'block';

$$('readme-button').onclick = function () {
  $$('readme-page').classList.toggle('hide');
}
$$('readme-page').onclick = function (e) {
  if(e.target === $$('readme-page')) $$('readme-page').classList.toggle('hide');
}

// $$('readme-button').click();
function checkForCookie () {
let c = document.cookie;
const cname = 'lastvisit';
let cstart, cend;
if (c.length) {
  cstart = c.indexOf(cname);
  if (cstart !== -1) {
    cstart += cname.length + 1;
    cend = c.indexOf(';', cstart);
    if (cend === -1) cend = c.length;
    let d = c.substring(cstart, cend);
    if (d.length) {
      return console.log('Last visit:', new Date(parseInt(d)));
    }
  }
}
$$('readme-button').click();
const expire = 7;
const date = new Date();
date.setTime(date.getTime() + expire * 24 * 3600 * 1000);
return document.cookie = `${cname}=${Date.now()}; expires=${date.toGMTString()} `;

}
checkForCookie();

function $$(str) {
  return document.getElementById(str);
}

})();
