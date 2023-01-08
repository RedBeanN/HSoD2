((Vue, axios) => {
  // const columns = ['时间', '神奈', '幻梦境', '盘龙', '缪娜', '阿尔忒弥斯', '夜夜'];
  const columns = ['时间', '丽贝卡', '眠梦', 'Yoko', '丝诺', '罗蕾莱', '恰卡纳'];
  const parseTime = timeStr => {
    const [month, day, hour, minute] = timeStr.split(/\s|-|:/g);
    return `${month}/${day} ${hour < 10 ? '0' + hour : hour}:${minute === '0' ? '00' : minute}`;
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
        colors: ['#69050d','#584572', '#b687b0', '#d5d9e2', '#ef8e5d', '#c7d867'],
      },
      chartSettings: { scale: [true, true] },
      zoom: {
        type: 'slider',
        start: 0,
        end: 100,
      },
    },
    components: { VeLine },
    created () {
      this.loadData();
    },
    methods: {
      async loadTop1kData () {
        const { data } = await axios.get(`https://api-1256168079.cos.ap-chengdu.myqcloud.com/faction/20231/data.json`);
        const rows = {};
        for (let key in data.factions) {
          for (let d of data.factions[key].data) {
            if (!rows[d.time]) rows[d.time] = {};
            rows[d.time][data.factions[key].factionName] = d.point;
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
