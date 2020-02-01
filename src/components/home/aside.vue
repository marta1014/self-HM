<template>
  <div class="aside">
    <div class="tc"><img :src="collapse ? smallImg :bigImg " alt=""></div>
    <el-menu background-color="#545c64"
    text-color="#adafb5"
    active-text-color="#ffd04b"
    router
    :collapse="collapse"
    >
      <!-- 没有折叠选项 -->
      <el-menu-item index="/home">
      <i class="el-icon-s-home"></i><span>首页</span>
      </el-menu-item>
      <!-- 折叠菜单外包el-submenu -->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-document-copy"></i><span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/article">文章列表</el-menu-item>
        <el-menu-item index="/home/comment">评论管理</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-female"></i><span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/graphic">图文数据</el-menu-item>
        <el-menu-item index="/home/aboutfans">粉丝概况</el-menu-item>
        <el-menu-item index="/home/portrait">粉丝画像</el-menu-item>
        <el-menu-item index="/home/allfans">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/user">
      <i class="el-icon-s-custom"></i><span>账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
  <!-- element-ui组件关于vue-router
    给el-menu router属性 开启路由模式 给每项item设置index
  以index作为path 进行路由跳转
  -->
</template>
<script>
export default {
  name: 'asideLeft',
  props: ['collapse'],
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang="less" scoped>
.aside {
  // width: 230px;
  .el-menu {
    border-right: 0;
  }
  .tc{
    background-color:  #2c2e2e;
    height: 50px;
  }
}
</style>
