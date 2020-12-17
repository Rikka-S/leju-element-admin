
var echarts = require('echarts')
export default {
  install(Vue) {
    Vue.prototype.$MyEcharts = echarts
  }
}
