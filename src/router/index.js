import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('views/login/Login.vue') //登录
const Home = () => import('views/home/Home.vue') //首页
const Users = () => import('views/home/users/Users') //用户列表
const RightsList = () => import('views/home/roles/RightsList') //权限列表
const RolesList = () => import('views/home/roles/RolesList') //角色列表
const Goods = () => import('views/home/product/Goods.vue') //商品管理
const Params = () => import('views/home/product/Params.vue') //分类列表
const Categories = () => import('views/home/product/Categories.vue') //商品分类
const Orders = () => import('../views/home/order/Orders.vue') //订单列表
const Reports = () => import('../views/home/information/Reports.vue') //数据报表

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [{
    path: '/login',
    component: Login,
    name: Login
  },
  {
    path: '/home',
    component: Home,
    name: Home,
    redirect: '/users',
    children: [{
        path: '/users',
        component: Users,
        name: Users
      },
      {
        path: '/rights',
        component: RightsList,
        name: RightsList
      }, {
        path: '/roles',
        component: RolesList,
        name: RolesList
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router