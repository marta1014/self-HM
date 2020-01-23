<template>
<!-- 大容器 -->
  <el-container class="home">
    <!-- 左侧区域 -->
    <el-aside style="width:230px">
      <!-- 左侧导航栏 -->
      <div class="tc"><img src="../../assets/img/logo_admin.png" alt=""></div>
      <asideLeft/>
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
export default {
  name: 'homePage',
  components: {
    // asideLeft, // 侧栏组件
    // layoutHeader
  }
}
</script>

<style lang="less" scoped>
.home{
  height: 100vh;
  .el-aside{
    background-color: #545c64;
    .tc{
      padding: 10px 0;
    }
  }
}
</style>
