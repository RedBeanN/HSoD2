window.onload = () => {
const $$ = mdui.JQ;
$$('#back-to-index').remove();
$$('body').removeClass('mdui-drawer-body-left');

const app = new Vue({
  el: '#app',
  data: {
    rows: [],
    pools: {
      'high': '公主',
      'custom': '魔女',
      'special': '魔法少女',
      'pet': '使魔'
    },
    searchInput: '',
    sortedFlag: true,
  },
  computed: {
    filteredRows () {
      const text = this.searchInput;
      return this.rows.filter(row => {
        if (row.startTime.indexOf(text) !== -1 ||
            row.endTime.indexOf(text) !== -1) return true;
        for (let item of row.data) {
          if (item.indexOf(text) !== -1) return true;
        }
        return false;
      });
    }
  },
  methods: {
    loadList (pool, e) {
      const self = this;
      showLoading();
      $$('.mdui-tab-active').removeClass('mdui-tab-active');
      $$(e.target).addClass('mdui-tab-active');
      axios.get(`/list/auto/${pool}`).then(res => {
        const table = res.data.map(i => {
          return {
            data: i.data,
            startTime: i.startTime.replace(/-/g, '/').split(' ')[0],
            endTime: i.endTime.replace(/-/g, '/').split(' ')[0]
          }
        });
        self.backToTop();
        if (pool === 'high') checkDumplicate(table);
        else if (pool === 'pet') return self.loadPet(table);
        self.rows = table.filter(r => r.data.length);
        self.sortTable();
        mdui.mutation('.mdui-table');
        hideLoading();
      });
    },
    loadPet (table) {
      const self = this;
      axios.get('/list/auto/pet-map').then(res => {
        const map = res.data;
        self.rows = table.map(r => {
          r.data = r.data.map(d => map[d] || '?');
          return r;
        });
        self.sortTable();
        mdui.mutation('.mdui-table');
        hideLoading();
      });
    },
    sortTable () {
      this.sortedFlag = !this.sortedFlag;
      let sortedFlag = this.sortedFlag;
      this.rows.sort((pre, now) => {
        let preTime = new Date(pre.startTime);
        let nowTime = new Date(now.startTime);
        return sortedFlag ? preTime - nowTime : nowTime - preTime;
      });
    },
    backToTop () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  mounted () {
    this.loadList('high', { target: $$('.pool-select')[0] });
    mdui.mutation();
  },
});

function showLoading () {
  $$('#progress').css('opacity', 1);
}
function hideLoading () {
  $$('#progress').css('opacity', 0);
}

function checkDumplicate(arr, now = 1, saved = 0) {
  if (arr.constructor != Array) throw new Error('Type Error: input data is not an array.');
  if (now >= arr.length) return;
  if (spliceFrom(arr[now].data, arr[saved].data)) {
    arr[saved].startTime = min(arr[saved].startTime, arr[now].startTime);
    arr[saved].endTime = max(arr[saved].endTime, arr[now].endTime);
  } else saved = now;
  now++;
  return checkDumplicate(arr, now, saved);
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

};