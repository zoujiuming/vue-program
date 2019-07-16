<template>
  <div class="rights">
    <!-- 面包屑导航 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
<el-breadcrumb-item>权限管理</el-breadcrumb-item>
</el-breadcrumb>
    <!-- main内容 -->

  <el-table
    ref="singleTable"
    :data="rightList"
    highlight-current-row>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="authName"
      label="权限名称">
    </el-table-column>
    <el-table-column
      property="path"
      label="路径">
    </el-table-column>
    <el-table-column
      property="level"
      label="层级">
      <template v-slot:default="{row: { level } }">
        <span v-if="+level === 0">一级</span>
        <span v-else-if="+level === 1">二级</span>
        <span v-else >三级</span>
      </template>
    </el-table-column>
  </el-table>

  </div>
</template>

<script>
export default {
  data () {
    return {
      rightList: []
    }
  },
  created () {
    this.getRightlist()
  },
  methods: {
    async getRightlist () {
      const { meta, data } = await this.axios.get('rights/list')
      if (meta.status === 200) {
        this.rightList = data
        // console.log(data)
      }
    }
  }
}
</script>

<style lang="less">
  #app {
    .el-breadcrumb {
      padding-left: 10px;
      height: 40px;
      line-height: 40px;
      background-color: #ddd;
    }
  }
</style>
