import asideLeft from './home/aside'
import layoutHeader from '@/components/home/layout-header'
import breadCrumb from './common/bread-crumb'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  // 原理就是vue去use（对象）的时候会调用 对象中的方法 install方法
  // 调用install方法式会传入vue对象
  // 实现步骤就是 定义一个对象 然后导出install方法 再去全局注册组件
  install (Vue) {
    Vue.component('asideLeft', asideLeft)// 注册全局组件
    Vue.component('layoutHeader', layoutHeader)
    Vue.component('breadCrumb', breadCrumb)
    Vue.component('quillEditor', quillEditor)
  }
}
