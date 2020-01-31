<template>
 <el-card>

         <breadCrumb slot="header">
         <template slot="title">账户信息</template>
         </breadCrumb>
         <el-form label-width="100px">
             <el-form-item label="用户名">
                 <el-input v-model="formData.name"></el-input>
             </el-form-item>
              <el-form-item label="简介">
                 <el-input v-model="formData.intro"
                 ></el-input>
             </el-form-item>
              <el-form-item label="邮箱">
                 <el-input v-model="formData.email"></el-input>
             </el-form-item>
              <el-form-item label="手机号">
                 <el-input disabled v-model="formData.mobile"></el-input>
             </el-form-item>
              <el-form-item>
                 <el-button type="primary">保存信息</el-button>
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
