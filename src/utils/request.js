// 封装axios请求
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'// 设置常态值
axios.interceptors.request.use(config => { // 请求拦截
  // config 请求配置选项 （默认url，method，params（URL参数，get参数，地址参数，query参数），
  // headers，data，baseURl，data
  // transformRequest：允许发请求之前修改数据（只能用在put，post，patch）
  // 后面数组中的函数必须返回一个字符串，ArrayBuffer or stream）
  // transformResponse 在传递给then/catch之前修改响应数据。。。。
// 请求前拦截 统一注入token
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, () => {
// 执行请求错误进入此函数
})
axios.interceptors.response.use(response => { // 响应拦截
// 成功执行该代码
//   console.log(response)
  //   return response ? response : {}
  // 有些情况response不存在 所以return一个不存在会报错 所以增设空对象 非空判断
  // layout-header.vue?31b9:50 Uncaught (in promise)
  // TypeError: Cannot read property 'data' of undefined
  return response || {}
}, error => {
  console.log(error)
  // 通过error里的config里的url地址+状态码判别对应业务需求
  // 失败
  let status = error.response.status
  let message = ''
  //   console.log(status)
  switch (status) {
    case 400 :
      message = '请求参数错误'
      break
    case 507 :
      message = '数据库异常'
      break
    case 401 :
      // token过期失效 回到登陆页
      // this.$router = router
      window.localStorage.removeItem('user-token')// 删除过期token
      router.push('/login')
      break
    case 403 :
      message = '没有权限'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
})
export default axios
