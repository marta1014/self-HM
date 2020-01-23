import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission' // 引用权限模块
import ElementUI from 'element-ui'
import component from './components'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/base.less'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.use(component)// 全局注册在实例化之前
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
