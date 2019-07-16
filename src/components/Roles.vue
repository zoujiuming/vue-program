<template>
  <div class="roles">
    <!-- 面包屑  -->
<el-breadcrumb separator-class="el-icon-arrow-right">
<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
<el-breadcrumb-item>角色管理</el-breadcrumb-item>
</el-breadcrumb>
<!-- 添加用户 -->
<el-button @click="showAddDialog" type="success" style="margin-left:0px;" plain>添加用户</el-button>
    <!-- main内容 -->
  <el-table
  :data="rolesList"
  >
  <el-table-column type="expand">
      <template v-slot:default="{ row }">
        <span v-show="row.children.length ===0 ">该角色没有更多的权限信息</span>
        <!-- 存一级权限 -->
        <el-row class="lv1" v-for="lv1 in row.children" :key="lv1.id">
          <el-col :span="4">
            <el-tag @close="delRight(row,lv1.id)"  closable>{{lv1.authName}}</el-tag>
            </el-col>
          <el-col :span="20">
        <!-- 存二级权限 -->
          <el-row class="lv2" v-for="lv2 in lv1.children" :key="lv2.id">
           <el-col :span="4"><el-tag @close="delRight(row,lv2.id)"  closable  type="success">{{lv2.authName}}</el-tag></el-col>
           <el-col :span="20">
        <!-- 存三级权限 -->
              <el-tag @close="delRight(row,lv3.id)" class="lv3"  closable  type="warning" v-for="lv3 in lv2.children" :key="lv3.id">{{lv3.authName}}</el-tag>
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
          <el-button @click="deleteRole(row,$event)" type="danger" icon="el-icon-delete" circle plain size="small" ></el-button>
           <el-button @click="showAssignDialog(row)" type="success" icon="el-icon-edit"  plain size="small" round >分配角色</el-button>
        </template>
    </el-table-column>
  </el-table>
  <!-- 分配权限的对话框 -->
  <el-dialog
  title="分配权限"
  :visible.sync="dialogVisible"
  width="35 %"
>
  <!-- 树形菜单  -->
  <el-tree
  ref="tree"
  :data="rightsList"
  show-checkbox
  node-key="id"
  default-expand-all
  :props="defaultProps">
</el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button  @click="assignRight" type="primary">确 定</el-button>
  </span>
</el-dialog>
 <!-- 添加框 和修改框复用-->
<el-dialog
  :title="title"
  :visible.sync="editDialogVisible"
  width="35%">
<el-form ref="form" :rules="rules" :model="form" label-width="80px" status-icon>
  <el-form-item label="角色名称" prop="roleName">
    <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
  </el-form-item>
   <el-form-item label="角色描述" prop="roleDesc">
    <el-input v-model="form.roleDesc" placeholder="请输入角色描述"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editRole">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      rolesList: [],
      dialogVisible: false,
      rightsList: [],
      // 指定树形控件如何显示
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 当前id
      roleId: '',
      editDialogVisible: false,
      form: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: ['blur'] }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: ['blur'] }
        ]
      }
    }
  },
  computed: {
    title () {
      return this.form.id ? '修改角色' : '添加角色'
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
      // console.log(data)
      this.rolesList = data
    },
    async delRight (row, rightId) {
      console.log(row, rightId)
      const res = await this.axios.delete(`roles/${row.id}/rights/${rightId}`)
      const { status, msg } = res.meta
      if (status === 200) {
        this.$message.success(msg)
        // 更新,不需要全部更新 只更新data部分
        row.children = res.data
      } else {
        this.$message.error(msg)
      }
    },
    async showAssignDialog (row) {
      this.dialogVisible = true
      // 拿到当前id
      this.roleId = row.id
      // 发送ajaax请求
      const { meta, data } = await this.axios.get('rights/tree')
      if (meta.status === 200) {
        this.rightsList = data
        // console.log(this.rightsList)
      }
      // 让拥有的权限默认选中
      // this.$refs.tree.setCheckedKeys([101])
      let ids = []
      row.children.forEach(lv1 => {
        lv1.children.forEach(lv2 => {
          lv2.children.forEach(lv3 => {
            ids.push(lv3.id)
          })
        })
      })
      this.$refs.tree.setCheckedKeys(ids)
    },
    async assignRight () {
      // 获取到所有的选中的权限id
      let ids = this.$refs.tree.getCheckedKeys()
      let half = this.$refs.tree.getHalfCheckedKeys()
      // console.log(ids)
      // console.log(half)
      let rids = [ ...ids, ...half ].join()
      const res = await this.axios.post(`roles/${this.roleId}/rights`, { rids })
      const { status, msg } = res.meta
      if (status === 200) {
        // 隐藏对话框
        this.dialogVisible = false
        // 重新渲染页面
        this.getRoleslist()
      } else {
        this.$message.error(msg)
      }
    },
    async deleteRole (row, e) {
      try {
        await this.$confirm('你确定要删除吗?', '温馨提示', {
          type: 'warning'
        })
        // 点击确定发送ajax
        const res = await this.axios.delete(`roles/${row.id}`)
        // console.log(res)
        const { status, msg } = res.meta
        if (status === 200) {
          // 成功提示
          this.$message.success(msg)
          // 刷新页面
          this.getRoleslist()
        }
      } catch (e) {
        this.$message('操作取消')
      } finally {
        let current = e.target
        if (e.target.nodeName === 'I') {
          current = e.target.parentNode
        }
        current.blur()
      }
    },
    showAddDialog () {
      this.editDialogVisible = true
      this.form.id = ''
      this.form.roleName = ''
      this.form.roleDesc = ''
    },
    showEditDialog (row) {
      this.editDialogVisible = true
      this.form.id = row.id
      this.form.roleName = row.roleName
      this.form.roleDesc = row.roleDesc
    },
    async editRole () {
      try {
      // 点击确定进行表单校验
        this.$refs.form.validate()
        // 发送ajax请求  根据id判断是添加还是修改
        //  添加角色
        // 请求路径：roles
        // 请求方法：post
        const { id } = this.form
        let method = id ? 'put' : 'post'
        let url = id ? `roles/${id}` : 'roles'
        let code = id ? 200 : 201
        //  axios不能直接 axios.method
        const res = await this.axios[method](url, this.form)
        const { status, msg } = res.meta
        if (status === code) {
          this.$message.success(msg)
          // 隐藏对话框
          this.editDialogVisible = false
          // 刷新页面
          this.getRoleslist()
        } else {
          this.$message.error(msg)
        }
      } catch {
        return false
      }
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
