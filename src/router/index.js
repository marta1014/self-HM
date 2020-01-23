import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/',
    component: () => import('../views/login')
  },
  { path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  { path: '/home',
    name: 'home',
    component: () => import('../views/home'),
    children: [
      {
        path: '', // 二级路由路径不写 代表默认组件
        component: () => import('../views/home/home')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
