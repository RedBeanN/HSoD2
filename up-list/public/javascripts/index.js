(() => {
  'use strict';

  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
      let container = $$('#iframe-container');
      let frame = $$('#iframe');

      let buttons = $$('.page-button');
      Array.prototype.forEach.call(buttons, butt => {
        butt.onclick = e => {
          let src = e.target.getAttribute('src');
          Array.prototype.forEach.call(buttons, btn => {
            btn.classList.remove('focus');
          });
          e.target.classList.add('focus');
          // console.log(`click @ ${src}`);
          frame.src = src;
          // if (server != 3) frame.src += `?build=${server}`;
          container.style.display = 'block';
        };
      });

      let hide = $$('#iframe-hide');
      hide.onclick = e => {
        container.style.display = 'none';
        frame.src = '';
        let lastClick = $$('.focus')[0];
        lastClick.classList.remove('focus');
      };

      // let factionRefresh = $$('#fw-refresh');
      // factionRefresh.onclick = updateFw;

      let toggleFw = $$('#toggle-fw');
      toggleFw.onclick = e => {
        $$('#faction-body').classList.toggle('hide');
        toggleFw.innerText = toggleFw.innerText === '-' ? '+' : '-';
      };

      // factionRefresh.click();
      ($$('#origin')).click();
    }
  });

function updateFw () {
  $$('#faction-score').classList.add('loading');
  let http = new sAjax();
  http.get('http://event.mihoyo.com/factionWar/', (err, data) => {
    if (err) console.error(err);
    let score = (JSON.parse(data)).data;
    $$('#left-total').innerText = score['faction_total_point'][1];
    $$('#right-total').innerText = score['faction_total_point'][2];
    $$('#left-line').innerText = score['faction_1000_point'][1];
    $$('#right-line').innerText = score['faction_1000_point'][2];
    $$('#faction-score').classList.remove('loading');
  }, true);
}

function getXhr () {
  if (window.XMLHttpRequest) return new XMLHttpRequest();
  else {
    try {
      return new ActiveXObject('Msxml2.XMLHTTP.6.0');
    } catch (e) {
      return new ActiveXObject('Msxml2.XMLHTTP.3.0');
    }
  }
}

function sAjax () {
  // simple ajax
  this.get = function (url, fn, flag) {
    let xhr = getXhr();
    xhr.open('GET', url, flag);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        fn(null, xhr.response)
      }
    };
    xhr.send(null);
  }
}

function $$(str) {
  if (typeof str != 'string') throw new Error(`Type Error: ${str} is not a string`);
  switch(str[0]) {
    case '#': return document.getElementById(str.substring(1));
    case '.': return document.getElementsByClassName(str.substring(1));
    default : return document.getElementsByTagName(str);
  }
}
})();