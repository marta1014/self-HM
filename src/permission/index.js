// 导航守卫 处理导航拦截器(用token和路由拦截器处理页面权限问题)
import router from '../router'
import progress from 'nprogress'//  进度条
import 'nprogress/nprogress.css' // 进度条样式文件
// 全局前置守卫 （当路由发生变化时 回调函数就会执行）
router.beforeEach((to, from, next) => {
  progress.start()// 开启进度条
  // 权限拦截 根据当前路径如果以/home开头
  if (to.path.startsWith('/home')) {
    // 确定检查范围
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  progress.done()// 关闭进度条
})
