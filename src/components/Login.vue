<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <img src="../assets/avatar.jpg" alt="">
  <el-form-item label="用户名">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
    <el-form-item label="密码">
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary">登录</el-button>
    <el-button>重置</el-button>
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
      }
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
