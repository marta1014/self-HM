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
    name: '',
    component: () => import('../views/home'),
    children: [
      {
        path: '', // 二级路由路径不写 代表默认组件
        component: () => import('../views/home/home')
      },
      {
        // path: '/home/comment', // 完整路径写法
        path: 'comment', // 路径简单写法
        component: () => import('../views/comment')
      },
      {
        path: 'material',
        component: () => import('../views/material')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
