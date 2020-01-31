<template>
  <el-tabs v-model="activeName">
      <el-tab-pane name="material" label="素材库">
          <div class="container-material">
              <el-card v-for="item of list" :key="item.id">
                  <img :src="item.url" alt="">
              </el-card>
          </div>
          <el-row type="flex" justify="center">
              <el-pagination background
              :total="pagination.total"
              :page-size="pagination.pageSize"
              :current-page="pagination.currentPage"
              @current-change="currentChange"
              layout="prev,pager,next">
              </el-pagination>
          </el-row>
      </el-tab-pane>
      <el-tab-pane name="update" label="上传">456</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material',
      list: [], // 素材数据
      pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 8
      }
    }
  },
  methods: {
    getMaterial () { // 获取素材
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          total_count: this.pagination.total,
          page: this.pagination.currentPage,
          per_page: this.pagination.pageSize
        }
      }).then(res => {
        const { data } = res.data
        this.list = data.results
        this.pagination.total = data.total_count
        this.pagination.currentPage = data.page
        this.pagination.pagesize = data.per_page
        console.log(data)
      })
    },
    currentChange (newpage) {
      this.pagination.currentPage = newpage
      this.getMaterial()
    }
  },
  created () {
    this.getMaterial()
  }

}
</script>

<style lang="less" scoped>
.el-tabs{
    .container-material{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-card{
            width: 150px;
            height: 200px;
            margin: 10px 0;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}

</style>
