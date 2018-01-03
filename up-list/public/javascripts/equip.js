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
let type = ['衣服', '徽章', '武器'];
let weaponType = {
  '近战-刀剑': {'攻击力': 0, '载弹': 1, '攻速': 3.3},
  '特殊-喷雾': {'攻击力': 0, '载弹': 25, '攻速': 1.7}
};

let app = new Vue({
  el: '#app',
  data: {
    user, equip, type, weaponType,
    selectedType: '',
    selectedWeapon: ''
  }
});