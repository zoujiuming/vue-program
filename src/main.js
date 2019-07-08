import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


const vm = 0

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
