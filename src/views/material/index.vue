<template>
<el-card class="material" v-loading="loading">
    <breadCrumb slot="header">
    <template slot="title">素材管理</template>
    </breadCrumb>
    <el-row type="flex" justify="end">
      <el-upload action=""
      :show-file-list="false"
      :http-request="uploadImg">
<!--ele-ui属性 http-request 覆盖默认的上传行为 可自定义上传实现 -->
      <el-button type="primary" size="small">上传图片</el-button>
    </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="全部" name="all">
        <div class="item">
        <el-card v-for="(item,index) of list" :key="index">
        <img :src="item.url" alt="" @click="preview(index)">
        <el-row class="oprate">
<!-- 是否被收藏 接口要求is_collected = true/false 收藏/否-->
            <i class="el-icon-star-on"
            @click="choice(item)"
            :style="{color:item.is_collected ? 'red' : '#000'}"></i>
            <i class="el-icon-delete-solid" @click="delItem(item.id)"></i>
        </el-row>
    </el-card>
    </div>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="collect">
        <div class="item">
        <el-card v-for="(item,index) of list" :key="index">
        <img :src="item.url" alt=""  @click="preview(index)">
    </el-card>
    </div>
        </el-tab-pane>
    </el-tabs>
    <!-- 公共分页 -->
      <el-row type="flex" justify="center"
      align="middle" style="height:60px">
      <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changeCurrent"
      :current-page="pagination.currentPage"
      :page-size="pagination.pagesize"
      :total="pagination.total"
      >
    </el-pagination>
    </el-row>
    <el-dialog :visible="visible" @opened="openEnd"
    @close="visible = false">
        <el-carousel ref="myCarousel" indicator-position="outside" height="500px">
    <el-carousel-item v-for="(item,index) in list" :key="index">
      <img :src="item.url" alt="" style="height:100%,width:100%">
    </el-carousel-item>
  </el-carousel>
    </el-dialog>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // tab栏默认选中
      list: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pagesize: 8
      },
      loading: false,
      visible: false,
      indexImg: -1// 保存点击图片索引
    }
  },
  methods: {
    getMaterial () { // 获取素材
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          total_count: this.pagination.total,
          page: this.pagination.currentPage,
          per_page: this.pagination.pagesize
        }
      }).then(res => {
        const { data } = res.data
        this.list = data.results
        this.pagination.total = data.total_count
        this.pagination.currentPage = data.page
        this.pagination.pagesize = data.per_page
        // console.log(data)
      })
    },
    changeTab () {
      // console.log(this.activeName)
      this.pagination.currentPage = 1// 切换页签必须显示第一页
      this.getMaterial()
    },
    changeCurrent (newpage) {
      this.pagination.currentPage = newpage
      this.getMaterial()
    },
    uploadImg (params) {
      this.loading = true
      let data = new FormData()
      data.append('image', params.file)// 文件加入到参数中
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(res => {
        console.log(res)
        this.loading = false
        this.pagination.currentPage = 1// 回第一页
        this.getMaterial()
      })
    },
    choice (item) { // 收藏
      // item.is_collected ? '取消收藏' : '收藏'
      this.$axios({
        method: 'put',
        url: `/user/images/${item.id}`,
        data: {
          collect: !item.is_collected// 取反 收藏就取消
        }
      }).then(res => {
        this.getMaterial()
      })
    },
    delItem (id) {
      // 执行此方法时报错 request.js 在处理大数字时 那时data是空串
      // 处理空串报错 Cannot read property 'status' of undefined
      // 改造requst.js进行非空判断
      this.$confirm('确定删除？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${id}`
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    preview (index) {
      this.visible = true
      // dialog是懒加载 没第一次弹出之前 没有元素内容
      // 需通过监听它的事件来进行系列操作
      this.indexImg = index
    },
    openEnd () { // 监听渲染完成事件 => 获取实例 => 调用方法
      this.$refs.myCarousel.setActiveItem(this.indexImg)
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
        i{
          cursor: pointer;
        }
    }
}
}
}
</style>
