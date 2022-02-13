import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import style from './assets/css/reset.css'    //全局样式
import iconfont from './assets/css/iconfont.css'    //图标字体
import ElementUI from 'element-ui';  // ElementUI
import 'element-ui/lib/theme-chalk/index.css';
import API from './serve/api.js'  // axios
import * as echarts from 'echarts';  //引入echarts



Vue.prototype.$api = API
Vue.use(ElementUI);
Vue.prototype.$bus = new Vue()  // bus
Vue.prototype.$url = 'http://47.96.158.85:9999' // bus
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts



new Vue({
  router,
  store,
  style,
  iconfont,
  render: h => h(App)
}).$mount('#app')
