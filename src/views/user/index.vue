<template>
 <el-card>

         <breadCrumb slot="header">
         <template slot="title">账户信息</template>
         </breadCrumb>
         <el-form label-width="100px">
             <el-form-item label="用户名">
                 <el-input></el-input>
             </el-form-item>
              <el-form-item label="简介">
                 <el-input type="textarea" rows="3" :autosize="{maxHeight:100,minHeight:40}"></el-input>
             </el-form-item>
              <el-form-item label="邮箱">
                 <el-input></el-input>
             </el-form-item>
              <el-form-item label="手机号">
                 <el-input disabled></el-input>
             </el-form-item>
              <el-form-item>
                 <el-button type="primary">保存信息</el-button>
             </el-form-item>
         </el-form>
         <el-upload action="" :show-file-list="false" class="upload">
             <img src="../../assets/img/IMG_0277.jpg" alt="">
         </el-upload>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
    //   defaultImg: require('../../assets/img/avatar.jpg')
    }
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
    top: 280px;
        img{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        }
    }
</style>
