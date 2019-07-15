<template>
  <div class="roles">
    <!-- 面包屑  -->
<el-breadcrumb separator-class="el-icon-arrow-right">
<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
<el-breadcrumb-item>角色管理</el-breadcrumb-item>
</el-breadcrumb>
    <!-- main内容 -->
  <el-table
  :data="rolesList"
  >
  <el-table-column type="expand">
      <template v-slot:default="{ row }">
        <!-- 存一级权限 -->
        <el-row class="lv1" v-for="lv1 in row.children" :key="lv1.id">
          <el-col :span="4">
            <el-tag   closable>{{lv1.authName}}</el-tag>
            </el-col>
          <el-col :span="20">
        <!-- 存二级权限 -->
          <el-row class="lv2" v-for="lv2 in lv1.children" :key="lv2.id">
           <el-col :span="4"><el-tag   closable  type="success">{{lv2.authName}}</el-tag></el-col>
           <el-col :span="20">
        <!-- 存三级权限 -->
              <el-tag class="lv3"  closable  type="warning" v-for="lv3 in lv2.children" :key="lv3.id">{{lv3.authName}}</el-tag>
           </el-col>
          </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column type="index" width="50"></el-table-column>
    <el-table-column prop="roleName" label="角色名称"></el-table-column>
    <el-table-column prop="roleDesc" label="描述"></el-table-column><el-table-column
    label="操作">
    <template v-slot:default="{row}">
          <el-button @click="showEditDialog(row)" type="primary" icon="el-icon-edit" circle plain  size="small" ></el-button>
          <el-button @click="deleteUser(row.id,$event)" type="danger" icon="el-icon-delete" circle plain size="small" ></el-button>
           <el-button type="success" icon="el-icon-edit"  plain size="small" round >分配角色</el-button>
        </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rolesList: []
    }
  },
  created () {
    this.getRoleslist()
  },
  methods: {
    async getRoleslist () {
      const { meta, data } = await this.axios.get('roles')
      if (meta.status === 200) {

      }
      console.log(data)
      this.rolesList = data
    }
  }
}
</script>

<style lang="less">
  .roles {
    .lv1 {
      padding:5px 0;
      border-bottom: dashed 1px #ddd;
    }
    .lv2 {
      margin-bottom: 5px;
    }
    .lv3 {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
</style>
