import Vue from 'vue'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import axios from 'axios'
import ElTreeGrid from 'element-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
// 定义一个全局过滤器
Vue.filter('dateFilter', function (value) {
  return moment(value * 1000).format('YYYY-MM-DD hh:mm:ss')
})
Vue.component(ElTreeGrid.name, ElTreeGrid)

// vue强行和axios添加关系
Vue.prototype.axios = axios
// 设置axios全局默认的BASE-URL， 只要设置了全局的默认base_url，以后的请求会自动拼接上base_url
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
//  配置axios的请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log('请求到')
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response)
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

Vue.use(ElementUI)
Vue.use(VueQuillEditor /* { default global options } */)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
