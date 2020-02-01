import Vue from 'vue'
export default new Vue()
// 公共实例 公共事件池eventBus
/**
 * 当前实例只能在当前实例监听
 * a在公共实例上触发一个事件 b组件就可在这个公共实例上监听 实现通信
 *
 * 任何组件间的传值 都可用eventBus
 *
 * eventBus.$emit(携带若干参数)    => 触发
 * eventBus.$on(事件名，function(若干参数){})   =>  监听
 */
