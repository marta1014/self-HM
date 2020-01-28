<template>
  <el-card class="article">
    <breadCrumb slot="header">
      <template slot="title">文章列表</template>
    </breadCrumb>
    <el-form>
      <el-form-item label="文章状态：">
          <el-radio-group v-model="search.status">
              <el-radio :label="5">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表：">
          <el-select placeholder="请选择频道"
          v-model="search.channel_id">
              <el-option v-for="item of channels"
              :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
          <el-date-picker
          type="daterange"
          v-model="search.dateRange"
          value-format="yyyy-MM-dd"
          ></el-date-picker>
      </el-form-item>
    </el-form>
    <el-row class="title" type="flex" align="middle">
        <span>共找到{{pagination.total}}条内容</span>
    </el-row>
    <div class="articleList" v-for="item of list" :key="item.id.toString()">
        <div class="left">
            <img :src="item.cover.images.length ? item.cover.images[0] :defaultImg" alt="">
            <div class="info">
                <span>{{item.title}}</span>
                <el-tag :type="item.status | aboutType">{{item.status | aboutStatus}}</el-tag>
                <span class="date">{{item.pubdate}}</span>
            </div>
        </div>
        <div class="right">
            <span><i class="el-icon-edit"></i>修改</span>
            <span @click="delMaterial(item.id)"><i class="el-icon-delete"></i>删除</span>
        </div>
    </div>
    <el-row type="flex" justify="center" class="pagination" align="middle">
      <el-pagination
      background
      layout="prev,pager,next"
      :current-page="pagination.currentPage"
      :page-size="pagination.pagesize"
      @current-change="changeCurrent"
      :total="pagination.total"
      >
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'articles',
  data () {
    return {
      search: {
        status: 5,
        channel_id: null, // 默认不选任何分类
        dateRange: []
      },
      channels: [],
      list: [],
      pagination: {
        total: 0,
        currentPage: 1,
        pagesize: 10
      },
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        const { data } = res.data
        this.channels = data.channels
        // console.log(res, data)
      })
    },
    getArticles (params) {
      // 改造方法实现复用 第一次params没传 => undefined
      this.$axios({
        url: '/articles',
        params
      }).then(res => {
        const { data } = res.data
        this.list = data.results
        this.pagination.total = data.total_count
        this.pagination.currentPage = data.page
        this.pagination.pagesize = data.per_page
        // console.log(data)
      })
    },
    changeCondition () {
      this.pagination.currentPage = 1
      this.getCondition()
    },
    delMaterial (id) {
      // 接口设置只能删除草稿
      this.$confirm('确认删除？').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getArticles()
        })
      })
    },
    changeCurrent (newpage) {
      this.pagination.currentPage = newpage
      this.getCondition()
    },
    getCondition () {
      let params = {
        page: this.pagination.currentPage,
        per_page: this.pagination.pagesize,
        status: this.search.status === 5 ? null : this.search.status,
        // 5是自定义的 接口没有 所以进行处理 后端要求全部是传null
        channel_id: this.search.channel_id,
        begin_pubdate: this.search.dateRange.length ? this.search.dateRange[0] : null,
        end_pubdate: this.search.dateRange.length > 1 ? this.search.dateRange[1] : null
      }
      this.getArticles(params)
    }
  },
  filters: {
    aboutStatus (value) {
      // 利用过滤器处理请求回数据显示问题
      switch (value) {
        case 0 :
          return '草稿'
        case 1 :
          return '待审核'
        case 2 :
          return '已发表'
        case 3 :
          return '审核失败'
      }
    },
    aboutType (value) {
      // 利用过滤器处理请求回数据显示问题
      switch (value) {
        case 0 :
          return 'warning'
        case 1 :
          return 'info'
        case 2 :
          return ''
        case 3 :
          return 'danger'
      }
    }
  },
  created () {
    this.getChannels()
    this.getArticles({ page: 1, per_page: 10 })
  },
  watch: {
    search: {
      handler: function () { // handler固定写法
        this.changeCondition()
      },
      deep: true// 深度监听
    }
  }
}
</script>

<style lang="less" scoped>
.article {
    .el-form{
        padding:50px;
    }
    .title{
        height: 40px;
        border-bottom: 1px dashed #999;
    }
    .articleList{
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #f2f3f5;
        .left{
            display: flex;
            img{
                width: 100px;
                height: 100px;
                border-radius: 6px;
                margin-right: 10px;
            }
            .info{
                display: flex;
                flex-direction: column;
                height: 100px;
                justify-content: space-between;
                .date{
                    color:#999;
                    font-size: 12px;
                }
                .el-tag{
                    width: 60px;
                    text-align: center;
                }
            }
        }
        .right{
            span{
                font-size: 14px;
                margin-left: 6px;
                cursor: pointer;
            }
        }
    }
    .pagination{
      height: 60px;
    }
}
</style>
