//import('vue.min.js');
//import('axios.min.js');

((Vue, axios) => {
  'use strict';

  const versions = [
    "5.3", "5.2", "5.1",
    "5.0", "4.9", "4.8", "4.7", "4.6", "4.5", "4.4", "4.3", "4.2", "4.1",
    "4.0", "3.9", "3.8", "3.7.5", "3.7", "3.6", "3.5", "3.4", "3.3", "3.2"
  ];
  let app = new Vue({
    el: '#app',
    data: {
      loading: true, error: false, versions,
      hintText: '加载中...',
      searchInput: { isFocus: false, text: '' },
      statusStyle: {
        '未处理': { color: '#1E40FE' },
        '已处理': { color: '#46CB47' },
        '进行中': { color: '#B212CE' },
        '不处理': { color: 'red'     },
      },
      versionFilter: '',
      selectedVersion: '',
      buglist: {}
    },
    computed: {
      searchIcon() {
        if (!this.searchInput.isFocus) return '/images/icons/Material/search_black.png';
        return '/images/icons/Material/search_white.png';
      },
      rows() {
        if (this.versionFilter) return this.buglist;
        let rows = [];
        for (let ver in this.buglist) rows.push(...this.buglist[ver]);
        return rows.reverse();
      },
      filterRows() {
        let text = this.searchInput.text;
        if (text === '') return this.rows;
        return this.rows.filter(row => {
          for (let i in row) {
            if (row[i].indexOf(text) !== -1) {
              return true;
            }
          }
          return false;
        });
        // return fr;
      },
    },
    methods: {
      sortTable() {
        this.sortedFlag = !this.sortedFlag;
        if (!this.versionFilter) {
          for (let rows in this.buglist) {
            this.buglist[rows].sort((pre, now) => pre.id - now.id );
          }
        } else {
          this.buglist.sort((pre, now) => now.id - pre.id );
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
      getBugList(v = '') {
        this.hintText = '加载中...';
        this.loading = true;
        axios.get('/buglist/data/' + v)
          .then(res => {
            if (v) app.buglist = JSON.parse(JSON.stringify(res.data));
            else app.buglist = res.data;
            app.loading = false;
            app.versionFilter = v;
            app.selectedVersion = v;
            app.sortTable();
          })
          .catch(err => {
            console.error(err);
            app.hintText = err;
          });
      },
      t2s(e) {
        /**
         *  convert Tradition Chinese to Simplified Chinise
         *  using OpenCC
         *  API: /convert/tw2sp?text=
         */
        if (e.target.tagName.toLowerCase() === 'button') {
          let index = e.target.getAttribute('index');
          let text = $$('#row-' + index).getElementsByClassName('text')[0].innerHTML;
          e.target.innerHTML = '正在干掉...';
          axios.get(encodeURI(`convert/tw2sp?text=${text}`))
            .then(res => {
              $$('#row-' + index).getElementsByClassName('text')[0].innerHTML = res.data;
              e.target.innerHTML = '干掉了！';
              e.target.setAttribute('disabled', 'disabled');
            })
            .catch(() => {
              e.target.innerHTML = '失败了……';
              setTimeout(() => { e.target.innerHTML = '再干一次?' }, 1000)
            });
        }
      }
    },
    created: function () {
      this.getBugList(versions[0]);
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