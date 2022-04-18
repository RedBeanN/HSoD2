//import('vue.min.js');
//import('axios.min.js');

((Vue, axios) => {
  'use strict';

  const versions = [];
  let app = new Vue({
    el: '#app',
    data: {
      loading: true, error: false, versions,
      hintText: '加载中...',
      searchInput: { isFocus: false, text: '' },
      statusStyle: {
        '1': { color: '#1E40FE' },
        '2': { color: 'red'     },
        '3': { color: '#46CB47' },
        '4': { color: '#B212CE' },
      },
      statusMap: {
        '1': '未处理',
        '2': '不处理',
        '3': '已处理',
        '4': '进行中',
      },
      tagMap: {
        '1': "装备",
        '2': "活动",
        '3': "意见",
        '4': "常规",
        '5': "报错",
        '6': "兼容",
      },
      showContent: {},
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
          return row.title.includes(text);
          for (let i in row) {
            if (row[i].includes && row[i].includes(text)) {
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
        axios.get('http://47.100.20.145:443/buglist/' + v)
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
      getT2S (text) {
        return axios.get(
          encodeURI(`/convert/t2s?text=${text.replace(/&nbsp;/, ' ').replace(/\+/g, '^plus^')}`)
        );
      },
      t2s(r, e) {
        /**
         *  convert Tradition Chinese to Simplified Chinise
         *  using OpenCC
         *  API: /convert/tw2sp?text=
         */
        if (!e || !e.target) return;
        for (let row in this.rows) {
          if (this.rows[row].id === r.id) {
            e.target.innerText = '正在干掉...';
            this.getT2S(this.rows[row].title).then(async title => {
              this.rows[row].title = title.data.replace(/\^plus\^/g, '+');
              const results = this.rows[row].content.match(/<p>[\s\S]*?<\/p>/g);
              if (results === null) return;
              for (let r of results) {
                if (r.includes('img')) continue;
                const { data } = await this.getT2S(r);
                this.rows[row].content = this.rows[row].content.replace(r, data).replace(/\^plus\^/g, '+');
              }
              return;
            }).then(() => {
              e.target.innerText = '干掉啦!';
              e.target.disabled = 'disabled';
            }).catch(() => {
              e.target.innerText = '失败了...';
              setTimeout(() => {
                e.target.innerText = '再试一次?';
              }, 1000);
            });
          }
        }
        // if (e.target.tagName.toLowerCase() === 'button') {
        //   let index = e.target.getAttribute('index');
        //   let text = $$('#row-' + index).getElementsByClassName('text')[0].getElementsByTagName('a')[0].innerHTML;
        //   e.target.innerHTML = '正在干掉...';
        //   text = text.replace(/\+/g, '^plus^')
        //   axios.get(encodeURI(`convert/t2s?text=${text}`))
        //     .then(res => {
        //       let dt = res.data;
        //       if (dt) dt = dt.replace(/\^plus\^/g, '+');
        //       $$('#row-' + index).getElementsByClassName('text')[0].getElementsByTagName('a')[0].innerHTML = dt;
        //       e.target.innerHTML = '干掉了！';
        //       e.target.setAttribute('disabled', 'disabled');
        //     })
        //     .catch(() => {
        //       e.target.innerHTML = '失败了……';
        //       setTimeout(() => { e.target.innerHTML = '再干一次?' }, 1000)
        //     });
        // }
      },
      showRow (index) {
        this.$set(this.showContent, index, !this.showContent[index]);
      },
      loadVersions() {
        const self = this;
        return new Promise((resolve, reject) => {
          axios.get('http://47.100.20.145:443/buglist/list').then(res => {
            self.versions = res.data.map(i => i.name);
            resolve();
          })
        })
      },
    },
    created: function () {
      this.loadVersions().then(_ => {
        this.getBugList(this.versions[0]);
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
