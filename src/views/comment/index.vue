<template>
  <el-card>
    <breadCrumb slot="header">
      <template slot="title">评论管理</template>
    </breadCrumb>
    <el-table :data="list">
      <!-- 接收属性list 给没项设置prop字段名称 -->
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column :formatter="fmBoolean" prop="comment_status"
      label="评论状态"></el-table-column>
      <!-- el-table 没有办法显示布尔值 通过element-UI 里table-column 里的formatter方法 -->
      <el-table-column prop="total_comment_count" label="总评数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- element-ui通过slot-scoped 可以获取到 row, column,
        $index 和 store（table 内部的状态管理）的数据
        同时也意味着可以获取到obj.row.column_status
        然后根据来显示开闭-->
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
        <!-- 根据状态决定关闭与否 -->
        <el-button type="text" size="small" @click="openAndClose(obj.row)">
          {{obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
        </template>

      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:60px">
      <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changeCurrent"
      :current-page="pagination.currentPage"
      :page-size="pagination.pagesize"
      :total="pagination.total">
    </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      list: [], // 接收数据
      pagination: {// 存放分页数据
        total: 0,
        currentPage: 1,
        pagesize: 10
      }
    }
  },
  methods: {
    getComments () {
      // 获取评论
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.pagination.currentPage,
          per_page: this.pagination.pagesize
        }
      }).then(res => { // 数据赋值
        const { data } = res.data
        this.list = data.results
        this.pagination.total = data.total_count
        this.pagination.currentPage = data.page
        this.pagination.pagesize = data.per_page
      })
    },
    fmBoolean (row, column, cellValue, index) { // 格式化布尔值方法
      // 当前行 当前列 当前单元格的值 索引
      return cellValue ? '正常' : '关闭'
    },
    openAndClose (row) {
      let mes = row.comment_status ? '关闭' : '打开'
      this.$confirm(`你是否确定${mes}评论？`).then(() => {
        // 调用接口更改状态
        this.$axios({
          method: 'put',
          url: 'comments/status',
          params: { article_id: row.id.toString() },
          // 经过JSON.bigint处理后是bignumber 转为字符串toString()
          data: { allow_comment: !row.comment_status }
        }).then(() => { // 重新拉取数据
          this.getComments()
        }).catch(() => {})
      })
    },
    changeCurrent (newpage) { // 页码改变 新页即当前页
      this.pagination.currentPage = newpage
      this.getComments()
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
