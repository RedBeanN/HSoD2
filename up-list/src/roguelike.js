(() => {
  new Vue({
    el: '#app',
    data: {
      servers: [
        '国服',
        'bilibili一区',
        'bilibili二区',
        '布卡服',
        '2144一区',
        '2144二区',
        '360一区',
        '360二区',
        '九游一区',
        '九游二区',
        '混服',
        '腾讯服',
      ],
      roles: [
        '琪亚娜',
        '雷电芽衣',
        '德丽莎',
        '希儿',
        '杏',
        '九霄',
      ],
      rankData: {},
      currentServer: '国服',
    },
    methods: {
      selectServer (s) {
        this.currentServer = s;
      },
    },
    created() {
      axios.get('https://api.redbean.tech/roguelike/data.json').then(res => {
        const { data } = res;
        this.$set(this, 'rankData', data);
      });
    }
  });
  })();
