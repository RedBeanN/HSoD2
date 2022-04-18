((Vue, axios) => {
  const factionMap = {
    0: "海拉",
    1: "巴罗尔",
    2: "幻梦境",
    3: "YUI",
    4: "䌷",
    5: "神奈",
  };
  const columns = ['时间', "海拉", "巴罗尔", "幻梦境", "YUI", "䌷", "神奈"];
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
          title: { text: '分数线' },
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
        const { data } = await axios.get('http://47.100.20.145:443/faction/20201/global');
        this.global = data;
        const globalRows = [], userRows = [], top1kRows = [];
        for (let d of this.global) {
          const globalObj = {
            '时间': this.getDate(d.time * 1000),
          };
          const userObj = {
            '时间': this.getDate(d.time * 1000),
          };
          // const top1kObj = {
          //   '时间': this.getDate(d.time * 1000),
          // };
          for (let f of d.data._faction_infos) {
            globalObj[factionMap[f._faction_id - 1]] = f._farm_point;
            userObj[factionMap[f._faction_id - 1]] = f._global_user_num;
            // top1kObj[factionMap[f._faction_id - 1]] = f._top_1k_num;
          }
          globalRows.push(globalObj);
          userRows.push(userObj);
          // top1kRows.push(top1kObj);
        }
        this.charts.global.rows = globalRows;
        this.charts.users.rows = userRows;
        // this.charts.top1k.rows = top1kRows;

      },
      async loadTop1kData () {
        // const rows = {};
        // const datas = [];
        // for (let key in factionMap) {
        //   const { data } = await axios.get(`http://47.100.20.145:443/faction/${Number(key) + 1}`);
        //   datas.push(data);
        // }
        // datas.forEach(data => {
        //   for (let i = 0; i < data.Timestamp.length; i++) {
        //     if (!rows[data.Timestamp[i]]) rows[data.Timestamp[i]] = [];
        //     rows[data.Timestamp[i]].push(data.Point[i]);
        //   }
        // });
        // const rowsArr = [];
        // for (let key in rows) {
        //   const obj = {
        //     '时间': this.getDate(key * 1000),
        //   };
        //   for (let k in rows[key]) {
        //     obj[factionMap[k]] = rows[key][k]
        //   };
        //   rowsArr.push(obj);
        // }
        // this.charts.top1k.rows = rowsArr;
        const rows = {};
        const { data } = await axios.get(`http://47.100.20.145:443/faction/20201/faction`);
        for (let key in data) {
          for (let d of data[key]) {
            const timestamp = d.time;
            const data = d.data;
            rows[timestamp] = rows[timestamp] || [];
            rows[timestamp][data._faction_id - 1] = data._global_point_history._point[data._global_point_history._point.length - 1];
          }
        }
        const rowsArr = [];
        for (let key in rows) {
          const obj = {
            '时间': this.getDate(key * 1000),
          };
          for (let k in rows[key]) {
            obj[factionMap[k]] = rows[key][k];
          }
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
