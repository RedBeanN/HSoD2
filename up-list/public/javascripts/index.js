(() => {
  'use strict';

  document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
      let container = document.getElementById('iframe-container');
      let frame = document.getElementById('iframe');

      let buttons = document.getElementsByClassName('page-button');
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

      let hide = document.getElementById('iframe-hide');
      hide.onclick = e => {
        container.style.display = 'none';
        frame.src = '';
        let lastClick = document.getElementsByClassName('focus')[0];
        lastClick.classList.remove('focus');
      };

      (document.getElementById('origin')).click();
    }
  });
})();