<template>
  <div class="login">
    <el-form :rules="rules" ref="form" :model="form" label-width="80px" status-icon>
      <img src="../assets/avatar.jpg" alt="">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
  </el-form-item>
    <el-form-item label="密码"  prop="password">
    <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">登录</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      //  表单校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 10, max: 14, message: '长度在 10 到 14 个字符', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      // 获取表单组件,调用方法
      this.$refs.form.resetFields()
    },
    submitForm () {
      this.$refs.form.validate(function (isvalid, obj) {
        if (isvalid) {
          console.log('发送ajax')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.login {
  widows: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  .el-form {
    width: 400px;
    background-color: #fff;
    margin: 200px auto;
    padding: 75px 40px 15px;
    border-radius: 20px;
    position: relative;
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top:-75px;
      border-radius: 50%;
      border: 8px solid #fff;
    }
  .el-button:last-child{
    margin-left: 100px;
  }
  }

}
</style>
