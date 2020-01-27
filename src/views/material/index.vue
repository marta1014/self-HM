<template>
<el-card class="material">
    <breadCrumb slot="header">
    <template slot="title">素材管理</template>
    </breadCrumb>
    <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="全部" name="all">
        <div class="item">
        <el-card v-for="(item,index) of list" :key="index">
        <img :src="item.url" alt="">
        <el-row class="oprate">
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
        </el-row>
    </el-card>
    </div>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="collect">
        <div class="item">
        <el-card v-for="(item,index) of list" :key="index">
        <img :src="item.url" alt="">
    </el-card>
    </div>
        </el-tab-pane>
    </el-tabs>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // tab栏默认选中
      list: []
    }
  },
  methods: {
    getMaterial () { // 获取素材
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect' }
      }).then(res => {
        const { data } = res.data
        this.list = data.results
        // console.log(data)
      })
    },
    changeTab () {
      console.log(this.activeName)
      this.getMaterial()
    }
  },
  created () {
    // 刚开始获取数据时 collect等于false 故显示全部
    this.getMaterial()
  }

}
</script>

<style lang="less" scoped>
.material{
.item{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .el-card{
    position: relative;
    width: 200px;
    height: 240px;
    margin: 20px;
    img{
        width: 100%;
        height: 100%;
    }
    .oprate{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        padding: 6px 0;
        font-size: 24px;
        display: flex;
        background-color: #f6f6f6;
        justify-content: space-around;
    }
}
}
}
</style>
