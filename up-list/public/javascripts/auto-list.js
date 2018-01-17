//import('vue.min.js');
//import('axios.min.js');

((Vue, axios) => {
'use strict';

let app = new Vue({
  el: '#app',
  data: {
    pools: {'high': '公主', 'custom': '魔女', 'special': '魔法少女', 'pets': '使魔'},
    rows: [],
    loading: true, error: false,
    hintText: '加载中...',
    selectedPool: 'high',
    sortedFlag: true,
    searchInput: {
      isFocus: false,
      text: ''
    },
  },
  computed: {
    maxCols() {
      let maxcols = 0;
      this.rows.forEach(row => {
        maxcols = (maxcols < row.data.length) ? row.data.length : maxcols;
      });
      return maxcols;
    },
    searchIcon() {
      if (!this.searchInput.isFocus) return '/images/icons/Material/search_black.png';
      else return '/images/icons/Material/search_white.png';
    },
    filterRows() {
      // if (this.searchInput.text == '') return this.rows;
      let fr = [];
      let text = this.searchInput.text;
      this.rows.forEach(row => {
        if (!row.data.length) {/* ignore empty */}
        else if (row.startTime.indexOf(text) != -1 || row.endTime.indexOf(text) != -1) {
          fr.push(row);
        } else {
          for (let i in row.data) {
            if (row.data[i].indexOf(text) != -1) {
              fr.push(row);
              break;
            }
          }
        }
      });
      return fr;
    },
    nameList() {
      let list = {};
      this.rows.forEach(row => {
        row.data.forEach(equip => {
          if (!list[equip] || (new Date(list[equip])) < (new Date(row.startTime))) {
            list[equip] = row.startTime.split(' ')[0];
          }
        });
      });
      return list;
    },
  },
  methods: {
    select(pool = 'high') {
      // console.log(pool);
      this.selectedPool = pool;
      this.loadData(pool);
    },
    loadData(pool = 'high') {
      this.loading = true;
      this.hintText = '加载中...';
      axios.get(`/list/auto/${pool}`)
        .then(res => {
          if (pool == 'pets') {
            let rows = res.data;
            axios.get('/list/auto/pet-map')
              .then(mapRes => {
                let map = mapRes.data;
                let petRows = [];
                rows.forEach(row => {
                  let tmp = {
                    startTime: row.startTime,
                    endTime: row.endTime,
                    data: []
                  };
                  row.data.forEach(i => {
                    tmp.data.push(i);
                    tmp.data.push(map[i] || '?');
                  });
                  petRows.push(tmp);
                });
                app.rows = petRows;
                app.loading = false;
                app.error = false;
                app.sortedFlag = true;
                app.sortTable();
              })
              .catch(err => {
                app.hintText = '拉取使魔资料出错！';
                app.loading = false;
                app.error = true;
              });
          } else {
            app.rows = res.data;
            app.loading = false;
            app.error = false;
            app.sortedFlag = true;
            app.sortTable();
          }
        })
        .catch(err => {
          app.hintText = '没有找到数据';
          app.loading = false;
          app.error = true;
        });
    },
    sortTable() {
      checkDumplicate(this.rows);
      this.sortedFlag = !this.sortedFlag;
      let sortedFlag = this.sortedFlag;
      this.rows.sort((pre, now) => {
        let preTime = new Date(pre.startTime);
        let nowTime = new Date(now.startTime);
        return sortedFlag ? preTime - nowTime : nowTime - preTime;
      });
    },
    focusSearch() {
      this.searchInput.isFocus = true;
      $$('#filter-input').classList.remove('hide');
      $$('#equip-filter').classList.remove('collapse');
      $$('#filter-input').focus();
    },
    blurSearch() {
      if (this.searchInput.text) return;
      this.searchInput.isFocus = false;
      $$('#filter-input').classList.add('hide');
      $$('#equip-filter').classList.add('collapse');
    }
  },
  created: function() {
    // load data here
    this.select('high');
    // this.loading = false;
  }
});

$$('#loading-page').remove();
$$('#app').style.display = 'block';

/* 一个查重算法
   递归遍历数组，只关心连续项的重复
   自动删除重复的部分，然后将重复项的时间调整至应有的范围
   尾递归调用，不必担心栈溢出
*/
function checkDumplicate(arr, now = 1, saved = 0) {
  if (arr.constructor != Array) throw new Error('Type Error: input data is not an array.');
  if (now >= arr.length) return;
  if (arr[now].data.length > arr[saved].data.length) {
    if (spliceFrom(arr[now].data, arr[saved].data)) {
      arr[saved].startTime = min(arr[saved].startTime, arr[now].startTime);
      arr[saved].endTime = max(arr[saved].endTime, arr[now].endTime);
    } else saved = now;
  } else {
    if (spliceFrom(arr[saved].data, arr[now].data)) {
      arr[now].startTime = min(arr[saved].startTime, arr[now].startTime);
      arr[now].endTime = max(arr[saved].endTime, arr[now].endTime);
    } else saved = now;
  }
  now++;
  checkDumplicate(arr, now, saved);
}
function spliceFrom(a, b) {
  if (a.constructor != Array || b.constructor != Array) {
    throw new Error('Type Error: input datas are not arrays');
  }
  let isDumplicated = false;
  for (let i in a) {
    for (let j in b) {
      if (a[i] == b[j]) {
        a.splice(i, 1);
        isDumplicated = true;
      }
    }
  }
  return isDumplicated;
}
function min(da, db) { return new Date(da) < new Date(db) ? da : db }
function max(da, db) { return new Date(da) > new Date(db) ? da : db }
/* 查重部分结束 */

/* 一个简易的 document.getElementxxx 的包
   为了避免和 jQuery 冲突使用 $$()
*/
function $$(str) {
  if (typeof str != 'string') throw new Error(`Type Error: ${str} is not a string`);
  switch(str[0]) {
    case '#': return document.getElementById(str.substring(1));
    case '.': return document.getElementsByClassName(str.substring(1));
    default : return document.getElementsByTagName(str);
  }
}

})(Vue, axios);