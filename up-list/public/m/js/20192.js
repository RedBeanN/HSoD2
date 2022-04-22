((Vue, axios) => {
const factionMap = {
  0: "阿拉",
  1: "科斯",
  2: "席丽雅",
  3: "杰伦",
  4: "莉兹",
  5: "斯库",
};
const columns = ['时间', "阿拉", "科斯", "席丽雅", "杰伦", "莉兹", "斯库"];
new Vue({
  el: '#app',
  data: {
    charts: {
      global: {
        columns,
        rows: [],
        title: { text: '阵营贡献' },
      },
      top1k: {
        columns,
        rows: [],
        title: { text: '实物分数线' },
      },
      users: {
        columns,
        rows: [],
        title: { text: '参战人数' },
      },
    },
    settings: {
      legendPosition: 'top',
      loading: false,
      colors: ['#dc0500', '#99295f', '#6f65af', '#e0dce8', '#f4e8b6', '#ada6a2'],
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
    async loadGlobalData () {
      const { data } = await axios.get('https://api.redbean.tech/faction/global');
      this.global = data;
      const globalRows = [], userRows = [];
      for (let d of this.global) {
        const globalObj = {
          '时间': this.getDate(d.timestamp),
        };
        const userObj = {
          '时间': this.getDate(d.timestamp),
        };
        for (let f of d.data) {
          globalObj[factionMap[f.Faction_id - 1]] = f.Farm_point;
          userObj[factionMap[f.Faction_id - 1]] = f.Global_user_num;
        }
        globalRows.push(globalObj);
        userRows.push(userObj);
      }
      this.charts.global.rows = globalRows;
      this.charts.users.rows = userRows;
    },
    async loadTop1kData () {
      const rows = {};
      const datas = [];
      for (let key in factionMap) {
        const { data } = await axios.get(`https://api.redbean.tech/faction/${Number(key) + 1}`);
        datas.push(data);
      }
      datas.forEach(data => {
        for (let i = 0; i < data.Timestamp.length; i++) {
          if (!rows[data.Timestamp[i]]) rows[data.Timestamp[i]] = [];
          rows[data.Timestamp[i]].push(data.Point[i]);
        }
      });
      const rowsArr = [];
      for (let key in rows) {
        const obj = {
          '时间': this.getDate(key * 1000),
        };
        for (let k in rows[key]) {
          obj[factionMap[k]] = rows[key][k]
        };
        rowsArr.push(obj);
      }
      this.charts.top1k.rows = rowsArr;
    },
    async loadData () {
      this.settings.loading = true;
      await this.loadGlobalData();
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
