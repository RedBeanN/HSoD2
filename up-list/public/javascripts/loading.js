(() => {
  let percent = 0, num = 0;
  let loading = setInterval(() => {
    num ++;
    percent = Math.floor(num / (num + 20) * 100);
    let ele = document.getElementById('loading-percentage');
    if (ele) ele.innerText = +percent + '%';
  }, 100)
  window.onload = () => {
    clearInterval(loading);
  };
})();