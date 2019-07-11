import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'

import axios from 'axios'
// vue强行和axios添加关系
Vue.prototype.axios = axios
// 设置axios全局默认的BASE-URL， 只要设置了全局的默认base_url，以后的请求会自动拼接上base_url
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
