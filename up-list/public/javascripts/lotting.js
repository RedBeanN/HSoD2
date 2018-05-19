//import('vue.min.js');

((Vue) => {
  let app = new Vue({
    el: '#app',
    data: {
      input: '',
      result: '',
      randomMin: 0,
      randomMax: 100,
      randomResult: 0
    },
    computed: {
      inputArray () {
        return this.input.split(/[,\r\n]/);
      },
    },
    methods: {
      roll () {
        if (!this.inputArray.length) return;
        this.result = this.inputArray[getRandomNumber(0, this.inputArray.length - 1)];
      },
      randomNumber () {
        this.randomResult = getRandomNumber(this.randomMin, this.randomMax);
      }
    }
  });

  function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

})(Vue);