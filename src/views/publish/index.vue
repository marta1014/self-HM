<template>
  <el-card class="publish">
    <breadCrumb slot="header">
      <template slot="title">发布文章</template>
    </breadCrumb>
    <el-form label-width="100px"
    ref="articleForm"
    :model="formData" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" rows="10" v-model="formData.content"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="2">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select placeholder="请选择频道" v-model="formData.channel_id">
          <el-option v-for="item of channels"
          :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="publishArticle">发表</el-button>
        <el-button  @click="publishArticle">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'publish',
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0, // 默认无图0
          images: []
        },
        channel_id: null
      },
      rules: {
        title: [{ required: true, message: '文章标题不能为空' },
          { min: 5, max: 30, message: '长度5至30字符之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        const { data } = res.data
        this.channels = data.channels
      })
    },
    publishArticle () {
    //   this.$refs.articleForm.validate(isOk => {
    //     if (isOk) {

    //     }
    //   })
    }
  },
  created () {
    this.getChannels()
  },
  filters: {},
  watch: {}
}
</script>

<style lang="less" scoped>
.publish {
  .el-form {
    margin-left: 50px;
    .el-input {
      width: 60%;
    }
  }
}
</style>
