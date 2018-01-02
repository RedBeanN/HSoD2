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
          console.log(`click @ ${src}`);
          frame.src = src;
          // if (server != 3) frame.src += `?build=${server}`;
          container.style.display = 'block';
        };
      });

      let back = document.getElementById('iframe-back');
      back.onclick = e => {
        let lastClick = document.getElementsByClassName('focus')[0];
        lastClick.click();
      };

      let hide = document.getElementById('iframe-hide');
      hide.onclick = e => {
        container.style.display = 'none';
        frame.src = '';
        let lastClick = document.getElementsByClassName('focus')[0];
        lastClick.classList.remove('focus');
      };

      let il = document.getElementById('iframe-link');
      il.onclick = e => {
        if (frame.src) window.open(frame.src);
      };


      (document.getElementById('origin')).click();
    }
  });
})();