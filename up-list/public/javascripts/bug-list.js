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
      loading: false, error: false, versions,
      hintText: 'loading...',
      searchInput: {
        isFocus: false,
        text: ''
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
    created: function () {
      axios.get('/buglist/data')
        .then(function (res) {
          app.buglist = res.data;
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