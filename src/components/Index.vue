<template>
 <el-container class="index">
  <el-header>
    <div class="logo"></div>
    <div class="title"><h1>电商后台管理系统</h1></div>
    <div class="logout">欢迎你,xxx<a @click="logout" href="JavaScript:;">退出</a></div>
  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      // 给提示
      this.$confirm('你确定要退出吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定移除token
        localStorage.removeItem('token')
        // 跳到登录页
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作取消'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped >
  .index {
  height: 100%;
  .el-header {
  background-color: #b3c1cd;
  display:flex;
    .logo,
    .logout {
      width:180px;
      height: 60px;
      line-height: 60px;
      font-weight: 700;
      text-align: right;
      a {
        color: green;
      }
    }
    .logo {
      background-color: #fff;
      background: url('../assets/logo.png') no-repeat  center center;
      background-size: contain
    }
    .title {
      flex:1;
      h1 {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-weight: 700;
        font-size: 30px;
        color: #fff;
      }
    }
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-main {
    background-color: #eaeef1;
  }
}
</style>
