<template>
  <div class="aside">
    <el-menu background-color="#545c64"
    text-color="#adafb5"
    active-text-color="#ffd04b"
    router
    >
      <!-- 没有折叠选项 -->
      <el-menu-item index="/home">首页</el-menu-item>
      <!-- 折叠菜单外包el-submenu -->
      <el-submenu index="1">
        <template slot="title">内容管理</template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/article">文章列表</el-menu-item>
        <el-menu-item index="/home/comment">评论管理</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">粉丝管理</template>
        <el-menu-item index="/home/graphic">图文数据</el-menu-item>
        <el-menu-item index="/home/aboutfans">粉丝概况</el-menu-item>
        <el-menu-item index="/home/portrait">粉丝画像</el-menu-item>
        <el-menu-item index="/home/allfans">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item>账户信息</el-menu-item>
    </el-menu>
  </div>
  <!-- element-ui组件关于vue-router
    给el-menu router属性 开启路由模式 给每项item设置index
  以index作为path 进行路由跳转
  -->
</template>
<script>
export default {
  name: 'asideLeft'
}
</script>

<style lang="less" scoped>
.aside {
  width: 230px;
  .el-menu {
    border-right: 0;
  }
}
</style>
