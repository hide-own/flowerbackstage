import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


const store = JSON.parse(sessionStorage.getItem("updateRouter"))
const storeBe = store == null



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      jump: true
    },
    children: [
      {
        // 首页
        path: '',
        name: 'Home',
        meta: {
          jump: true
        },
        component: () => import('../views/index/index.vue')
      },
      {
        // 轮播
        path: '/banner',
        name: 'Banner',
        meta: {
          jump: storeBe ? true : store[0].deta
        },
        component: () => import('../views/banner/banner.vue')
      },
      {
        // 分类
        path: '/sort',
        name: 'Sort',
        meta: {
          jump: storeBe ? true : store[1].deta
        },
        component: () => import('../views/sort/sort.vue')
      },
      {
        // 商品
        path: '/goods',
        name: 'Goods',
        meta: {
          jump: storeBe ? true : store[2].deta
        },
        component: () => import('../views/goods/goods.vue')
      },
      {
        // 管理员
        path: '/admin',
        name: 'Admin',
        meta: {
          jump: storeBe ? true : store[3].deta
        },
        component: () => import('../views/admin/admin.vue')
      }
    ]
  },
  {
    // 登录
    path: '/login',
    name: 'Login',
    meta: {
      jump: true
    },
    component: () => import('../views/Login.vue')
  }
]
// 'hash', history
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


// 路由守卫
router.beforeEach((to, form, next) => {
  // 如果不是去登录页，和没有token就去登录页面
  if (to.fullPath != "/login" && localStorage.getItem("token") == null) {
    router.push("/login")
  } else if (to.meta.jump) {
    next()
  }
})

export default router
