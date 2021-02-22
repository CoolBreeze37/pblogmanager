    // 生成一个随机数
    function randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }
    // 生成一个随机的颜色
    function randomColor(min, max) {
      var r = randomNum(min, max)
      var g = randomNum(min, max)
      var b = randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    }
    export {
      randomNum,
      randomColor
    }