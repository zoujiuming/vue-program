import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Index from './components/Index.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Index, name: 'index' },
    { path: '/login', component: Login, name: 'login' }
  ]
})

export default router
