<template>
 <el-card>

         <breadCrumb slot="header">
         <template slot="title">账户信息</template>
         </breadCrumb>
         <el-form label-width="100px" ref="myform"
         :model="formData" :rules="rules">
             <el-form-item label="用户名" prop="name">
                 <el-input v-model="formData.name"></el-input>
             </el-form-item>
              <el-form-item label="简介">
                 <el-input v-model="formData.intro"
                 ></el-input>
             </el-form-item>
              <el-form-item label="邮箱" prop="email">
                 <el-input v-model="formData.email"></el-input>
             </el-form-item>
              <el-form-item label="手机号">
                 <el-input disabled v-model="formData.mobile"></el-input>
             </el-form-item>
              <el-form-item>
                 <el-button type="primary" @click="saveUser">保存信息</el-button>
             </el-form-item>
         </el-form>
         <el-upload action="" :show-file-list="false" class="upload">
             <img :src="formData.photo ? formData.photo : defaultImg" alt="">
         </el-upload>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/IMG_0277.jpg'),
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules:
      {
        name: [{ required: true, message: '用户名必填' },
          { max: 10, message: '1～10之间字符' }],
        email: [{ required: true, message: '邮箱必填' },
          { pattern: /^([0-9A-Za-z\-.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g,
            message: '格式不正确' }]
      }
    }
  },
  methods: {
    getuser () {
      this.$axios({
        url: '/user/profile'
      }).then(res => {
        const { data } = res.data
        this.formData = data
      })
    },
    saveUser () {
      this.$refs.myform.validate().then(() => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(res => {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        })
      })
    }
  },
  created () {
    this.getuser()
  }

}
</script>

<style lang="less" scoped>
.el-form{
    margin-left: 100px;
    .el-input{
        width: 40%;
    }
    .textarea{
        resize: none
    }
}
.upload{
    position: absolute;
    right: 100px;
    top: 180px;
        img{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        }
    }
</style>
