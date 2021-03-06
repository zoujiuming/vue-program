import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: 'index' */ './components/Login.vue')

const Index = () => import(/* webpackChunkName: 'index' */ './components/Index.vue')
const Users = () => import(/* webpackChunkName: 'users' */ './components/users/Users.vue')
const Rights = () => import(/* webpackChunkName: 'rights' */'./components/rights/Rights.vue')
const Roles = () => import(/* webpackChunkName: 'rights' */'./components/rights/Roles.vue')
const Categories = () => import(/* webpackChunkName: 'products' */'./components/products/Categories.vue')
const Goods = () => import(/* webpackChunkName: 'products' */'./components/products/Goods.vue')
const Add = () => import(/* webpackChunkName: 'products' */'./components/products/Add.vue')
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
        { path: '/goods-add', name: 'goods-add', component: Add }
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
