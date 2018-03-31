//import('vue.min.js');
//import('axios.min.js');

((Vue, axios) => {
  'use strict';

  const versions = [
    "5.1", "5.0", "4.9", "4.8", "4.7", "4.6", "4.5", "4.4", "4.3", "4.2", "4.1",
    "4.0", "3.9", "3.8", "3.7.5", "3.7", "3.6", "3.5", "3.4", "3.3", "3.2"
  ];
  let app = new Vue({
    el: '#app',
    data: {
      loading: true, error: false, versions,
      hintText: 'loading...',
      searchInput: {
        isFocus: false,
        text: ''
      },
      statusStyle: {
        '未处理': { color: '#1E40FE' },
        '已处理': { color: '#46CB47' },
        '进行中': { color: '#B212CE' },
        '不处理': { color: 'red' },
      },
      versionFilter: '',
      buglist: {}
    },
    computed: {
      searchIcon() {
        if (!this.searchInput.isFocus) return '/images/icons/Material/search_black.png';
        else return '/images/icons/Material/search_white.png';
      },
      rows() {
        let rows = [];
        if (this.versionFilter && this.buglist[this.versionFilter]) {
          rows.push(...this.buglist[this.versionFilter]);
        } else {
          for (let ver in this.buglist) {
            rows.push(...this.buglist[ver]);
          }
        }
        return rows.reverse();
      },
      filterRows() {
        let fr = [];
        let text = this.searchInput.text;
        this.rows.forEach(row => {
          for (let i in row) {
            if (row[i].indexOf(text) != -1) {
              fr.push(row);
              break;
            }
          }
        });
        return fr;
      },
    },
    methods: {
      sortTable() {
        this.sortedFlag = !this.sortedFlag;
        let sortedFlag = this.sortedFlag;
        for (let rows in this.buglist) {
          this.buglist[rows].sort((pre, now) => {
            return pre.id - now.id;
          });
        }
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
      },
      t2s(ver, id, e) {
        let text = '', index = -1;
        this.buglist[ver].forEach((row, _index) => {
          if (row.id == id) {
            text = row.title;
            index = _index;
          }
        });
        if (index != -1) {
          $$(`#t2s-${e}`).innerHTML = '正在干掉...';
          axios.get(encodeURI(`t2s?text=${text}`))
            .then(res => {
              app.buglist[ver][index].title = res.data;
              $$(`#t2s-${e}`).innerHTML = '干掉了！';
            })
            .catch(err => {
              $$(`#t2s-${e}`).innerHTML = '失败了……';
              console.log(err);
            });
        }
      }
    },
    created: function () {
      axios.get('/buglist/data')
        .then(function (res) {
          app.buglist = res.data;
          app.loading = false;
          app.sortTable();
        })
        .catch(function (err) {
          app.hintText = err;
        });
    }
  });

  $$('#loading-page').remove();
  $$('#app').style.display = 'block';
  
  function $$(str) {
    if (typeof str != 'string') throw new Error(`Type Error: ${str} is not a string`);
    switch(str[0]) {
      case '#': return document.getElementById(str.substring(1));
      case '.': return document.getElementsByClassName(str.substring(1));
      default : return document.getElementsByTagName(str);
    }
  }
})(Vue, axios);