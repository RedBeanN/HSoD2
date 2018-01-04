let user = {
  level: {
    name: '等级',
    value: 380
  },
  name: {
    name: '昵称',
    value: 'RB'
  },
  coin: {
    name: '金币',
    value: 65536
  },
  crystal: {
    name: '水晶',
    value: 8088
  }
};
let equip = {
  top: {
    serial: {
      name: '编号',
      value: 2333
    },
    name: {
      name: '装备名',
      value: '巴斯克维尔的猎犬'
    },
    stars: {
      name: '星级',
      value: 6
    },
    level: {
      name: '等级',
      value: 99
    },
    love: {
      name: '亲密度',
      value: 50
    },
    adds: {
      name: '追加等级',
      value: 99
    },
    weight: {
      name: '负重',
      value: 25
    }
  },
  awaken: false,
  type: '徽章',
  atk: 0,
  payload: 255
};
let type = ['服装', '徽章', '武器'];
let equipType = {
  '服装': { '生命': 2000 },
  '徽章': { '移速': 14.9 },
  '近战-刀剑': { '攻击力': 0, '载弹': 1, '攻速': 3.3 },
  '特殊-喷雾': { '攻击力': 0, '载弹': 25, '攻速': 1.7 }
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
        if (k == this.addType) adds[k] = true;
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
      if (key != '移速') return Math.floor(val * (1 +
            (Number(this.equip.top.adds.value) +
             Number(this.equip.top.love.value)) *
             rate * 0.01));
      else return (+(( Number(this.equip.top.adds.value) +
        Number(this.equip.top.love.value)).toFixed(1) * 0.1) +
         '%');
    },
    generateArray: function (num) {
      return Array(Number(num));
    }
  }
});