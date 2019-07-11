<template>
  <el-container class="index">
    <el-header>
      <div class="logo"></div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        欢迎你,xxx
        <a @click="logout" href="JavaScript:;">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active=""
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
        >
          <el-submenu index="1">
            <template v-slot:title>
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
        <template v-slot:title>
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
            <i class="el-icon-menu"></i>
            <span>角色列表</span>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <el-menu-item index="2-2">
            <i class="el-icon-menu"></i>
            <span>权限列表</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
        </el-menu>
      </el-aside>
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
      })
        .then(() => {
          // 点击确定移除token
          localStorage.removeItem('token')
          // 跳到登录页
          this.$router.push('/login')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消'
          })
        })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped >
.index {
  height: 100%;
  .el-header {
    background-color: #b3c1cd;
    display: flex;
    .logo,
    .logout {
      width: 180px;
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
      background: url("../assets/logo.png") no-repeat center center;
      background-size: contain;
    }
    .title {
      flex: 1;
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
    .el-submenu {
      width: 200px;
    }
  }
  .el-main {
    background-color: #eaeef1;
  }
}
</style>
