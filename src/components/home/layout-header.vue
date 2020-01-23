<template>
  <div class="layout-header">
      <el-row type="flex" class="header" align="middle">
          <el-col :span="18" class="left">
            <i class="el-icon-s-fold"></i>
            <span>这是一首简单的小情歌</span>
          </el-col>
          <el-col :span="6" class="right">
            <el-row type="flex" justify="end" align="middle">
              <img src="../../assets/img/avatar.jpg" alt="">
              <el-dropdown>
                <!-- 此处span 为匿名插槽 为了显示名称内容 -->
                <span>你的承诺</span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>git地址</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
  </el-dropdown-menu>
              </el-dropdown>
            </el-row>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  name: 'layoutHeader'
}
</script>

<style lang="less" scoped>
.layout-header{
  .header{
    height: 50px;
    .left{
      font-size: 18px;
      span{
        margin-left: 4px;
      }
    }
    .right{
      img{
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}

</style>
