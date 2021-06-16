((Vue, axios) => {
  // const columns = ['时间', "希露", "纹章", "妥芮朵", "亚巴顿", "YUI", "槲寄生"];
  const columns = ['时间', "米梅", "伊登", "布伦希尔德", "樱华", "路西法", "拉克西米"];
  const parseTime = timeStr => {
    const [month, day, hour, minute] = timeStr.split(/\s|-|:/g);
    return `2021/${month}/${day} ${hour}:${minute}:00`;
  };
  new Vue({
    el: '#app',
    data: {
      charts: {
        top1k: {
          columns,
          rows: [],
          title: { text: '分数线' },
        },
      },
      settings: {
        legendPosition: 'top',
        loading: false,
        colors: ['#89bbe6', '#ca80a9', '#d47c8c', '#90d9e5', '#f0d394', '#89bbe6'],
      },
      chartSettings: { scale: [true, true] },
      zoom: {
        type: 'slider',
        start: 0,
        end: 100,
      },
      global: {},
    },
    components: { VeLine },
    created () {
      this.loadData();
    },
    methods: {
      async loadTop1kData () {
        const { data } = await axios.get(`https://api-1256168079.cos.ap-chengdu.myqcloud.com/faction/20211/data.json`);
        const rows = {};
        for (let key in data) {
          if (!key.startsWith('faction')) continue;
          for (let d of data[key].data) {
            if (!rows[d.time]) rows[d.time] = {};
            rows[d.time][data[key].factionName] = d.point;
          }
        }
        const rowsArr = [];
        for (let time in rows) {
          const obj = {
            "时间": parseTime(time),
          };
          for (let point in rows[time]) {
            obj[point] = rows[time][point];
          }
          rowsArr.push(obj);
        }
        rowsArr.sort((a, b) => {
          return new Date(a['时间']) - new Date(b['时间']) > 0 ? 1 : -1;
        });
        this.charts.top1k.rows = rowsArr;
      },
      async loadData () {
        this.settings.loading = true;
        await this.loadTop1kData();
        this.settings.loading = false;
      },
      format (s) {
        s = s.toString();
        if (s.length < 2) return '0' + s;
        return s;
      },
      getDate (d) {
        const time = new Date(d);
        return `${time.getMonth() + 1}-${this.format(time.getDate())} ${this.format(time.getHours())}:${this.format(time.getMinutes())}`;
      },
    }
  });
  
  })(Vue, axios);
