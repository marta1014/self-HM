<template>
<!-- 大容器 -->
  <el-container class="home">
    <!-- 左侧区域 -->
    <el-aside :style="{ width: collapse ? '60px' : '230px'}">
      <!-- 左侧导航栏 -->
      <asideLeft :collapse="collapse"></asideLeft>
    </el-aside>
    <!-- 右侧区域 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <layoutHeader></layoutHeader>
      </el-header>
      <!-- 主区域 -->
      <el-main>
      <router-view/>
      <!-- 二级路由容器区域 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import asideLeft from '@/components/home/aside'
// import layoutHeader from '@/components/home/layout-header'
import eventBus from '../../utils/eventBus'
export default {
  name: 'homePage',
  data () {
    return {
      collapse: false
    }
  },
  components: {
    // asideLeft, // 侧栏组件
    // layoutHeader
  },
  created () {
    eventBus.$on('changeCallapse', () => {
      // 通知折叠变化
      this.collapse = !this.collapse
    })
  }
}
</script>

<style lang="less" scoped>
.home{
  height: 100vh;
  .el-aside{
    background-color: #545c64;
    transition: .2s;
    .tc{
      padding: 10px 0;
    }
  }
}
</style>
