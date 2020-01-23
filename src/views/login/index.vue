<template>
  <div class="login">
    <el-card>
      <div slot="header" class="tc">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model="loginForm" ref="myLogin" :rules="rules">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入用户名"
          v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输入验证码"
          style="width:64%"
          v-model="loginForm.code"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox style="margin-right:10px"
          v-model="loginForm.check"></el-checkbox>
          <span>已同意并阅读条款已同意并阅读条款</span>
        </el-form-item>
      </el-form>
      <el-button style="width:100%" type="primary"
      @click="loginIn">登陆</el-button>
    </el-card>
  </div>
</template>

<script>
// import { loginIn } from '@/api/user'
export default {
  name: 'loginPage',
  data () {
    return {
      loginForm: {
        // 数据对象绑定
        mobile: '13911111111',
        code: '246810',
        check: true
      },
      rules: {
        // 验证规则绑定通过prop字段
        mobile: [
          { required: true, message: '此处必填' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '格式有误' }
        ],
        code: [
          { required: true, message: '此处必填' },
          { pattern: /^\d{6}$/, message: '格式有误' }
        ],
        check: [
          {
            validator: function (rules, value, callback) {
              value ? callback() : callback(new Error('您必须同意此条件'))
            }
          }
        ]
      }
    }
  },
  methods: {
    loginIn () {
      // 登陆触发手动校验
      this.$refs.myLogin.validate(ok => {
        // const user = this.loginForm
        if (ok) {
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
          this.$axios({
            url: 'authorizations',
            method: 'post',
            data: this.loginForm
          })
            .then(res => {
              // console.log(res.data.data.token)
              const { data } = res.data // 解构赋值
              // console.log(data)
              localStorage.setItem('user-token', data.token) // 存至本地
              this.$router.push('/home') // 编程式导航
            })
            .catch(() => {
              // debugger
              this.$message({
                message: '登陆失败，请重新登录',
                type: 'warning'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background: url("../../assets/img/background.jpg");
  background-size: cover;
  .el-card {
    width: 400px;
    height: 360px;
    opacity: 0.6;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      height: 40px;
    }
  }
}
</style>
