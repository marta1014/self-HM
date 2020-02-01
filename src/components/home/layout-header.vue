<template>
  <div class="layout-header">
      <el-row type="flex" class="header" align="middle">
          <el-col :span="18" class="left">
            <i :class="{'el-icon-s-unfold':collapse,'el-icon-s-fold':!collapse}"
            @click="collapsed"></i>
            <span>这是一首简单的小情歌</span>
          </el-col>
          <el-col :span="6" class="right">
            <el-row type="flex" justify="end" align="middle">
              <img :src="userinfo.photo ? userinfo.photo :defaultPhoto" alt="">
              <el-dropdown @command="clickmenu">
                <!-- 此处span 为匿名插槽 为了显示名称内容 -->
                <span>{{userinfo.name}}</span>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">{{userinfo.intro}}</el-dropdown-item>
                <el-dropdown-item command="email">{{userinfo.email}}</el-dropdown-item>
                <el-dropdown-item command="exit">退出</el-dropdown-item>
  </el-dropdown-menu>
              </el-dropdown>
            </el-row>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  name: 'layoutHeader',
  data () {
    return {
      userinfo: {},
      defaultPhoto: require('../../assets/img/avatar.jpg'), // 引用图片地址给该变量
      collapse: false
    }
  },
  methods: {
    clickmenu (command) { // 点击菜单项时触发的事件
      if (command === 'info') {
        this.$router.push('/user')
      } else if (command === 'email') {
        window.location.href = 'https://baike.baidu.com/item/%E9%98%BF%E6%B6%B5/23563743?fr=aladdin'
      } else {
        localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    },
    async getUserinfo () {
      let res = await this.$axios({
        url: '/user/profile'
      })
      const { data } = res.data
      this.userinfo = data
    },
    collapsed () {
      this.collapse = !this.collapse
      eventBus.$emit('changeCallapse')
    }
  },
  created () {
    this.getUserinfo()
    // 开启监听
    eventBus.$on('updateUserinfo', () => {
      this.getUserinfo()
    })
  }
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
