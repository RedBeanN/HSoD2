(() => {
  if ('serviceWorker' in navigator) {
    console.log('Init serviceWorker.');
    navigator.serviceWorker.register('/javascripts/sw.js')
      .then(registration => {
        var serviceWorker;
      })
      .catch(console.error);
  } else console.log('Connot find serviceWorker in this browser.');
})();