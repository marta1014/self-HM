// 封装axios请求
import axios from 'axios'
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

export default axios
