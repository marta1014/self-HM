<template>
  <div class="aside">
    <el-menu background-color="#545c64"
    text-color="#adafb5"
    active-text-color="#ffd04b">
      <!-- 没有折叠选项 -->
      <el-menu-item>首页</el-menu-item>
      <!-- 折叠菜单外包el-submenu -->
      <el-submenu index="1" router>
        <template slot="title">内容管理</template>
        <el-menu-item>发布文章</el-menu-item>
        <el-menu-item>文章列表</el-menu-item>
        <el-menu-item>评论管理</el-menu-item>
        <el-menu-item>素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">粉丝管理</template>
        <el-menu-item>图文数据</el-menu-item>
        <el-menu-item>粉丝概况</el-menu-item>
        <el-menu-item>粉丝画像</el-menu-item>
        <el-menu-item>粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item>账户信息</el-menu-item>
    </el-menu>
  </div>
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
