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
          <el-select placeholder="请选择频道" v-model="search.channels_id">
              <el-option v-for="item of channels"
              :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="时间选择：">
          <el-date-picker
          type="daterange"
          v-model="search.dateRange"
          ></el-date-picker>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'articles',
  data () {
    return {
      search: {
        status: 5,
        channels_id: null, // 默认不选任何分类
        dateRange: []
      },
      channels: []
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
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.article {
    .el-form{
        padding:50px;
    }
}
</style>
