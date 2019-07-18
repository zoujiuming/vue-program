import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Index from './components/Index.vue'
import Users from './components/users/Users.vue'
import Rights from './components/rights/Rights.vue'
import Roles from './components/rights/Roles.vue'
import Categories from './components/products/Categories.vue'
import Goods from './components/products/Goods.vue'
import Add from './components/products/Add.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index',
      component: Index,
      name: 'index',
      children: [
        { path: '/users', name: 'users', component: Users },
        { path: '/rights', name: 'rights', component: Rights },
        { path: '/roles', name: 'roles', component: Roles },
        { path: '/categories', name: 'categories', component: Categories },
        { path: '/goods', name: 'goods', component: Goods },
        { path: '/add', name: 'add', component: Add }
      ] },
    { path: '/login', component: Login, name: 'login' }
  ]
})
router.beforeEach((to, from, next) => {
  //  to只要不是去login,都应该判断是否有token
  //  to如果要是去/login,不管有没有token 可以直接next()
  //  to不是去,判断有没有token直接放行,否则去login
  const token = localStorage.getItem('token')
  if (to.path === '/login') {
    return next() // 去login 就去
  }
  if (token) { // 有令牌就随意走
    next()
  } else {
    next('/login') // 啥都没有就去登录去
  }
})

export default router
