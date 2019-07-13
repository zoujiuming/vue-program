<template>
<div class="users">
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
</el-breadcrumb>
  <!-- 搜索栏 -->
  <div style="margin: 15px 0;">
    <el-input style="  width: 300px;" placeholder="请输入内容" v-model="query" class="input-with-select">
    <el-button slot="append" icon="el-icon-search" @click="queryUser"></el-button>
  </el-input>
  <el-button @click="showAddDialog" type="success" style="margin-left:30px;" plain>添加用户</el-button>
  </div>
  <!-- 表格 -->
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
       <el-table-column
        label="用户状态">
        <template v-slot:default="{row}">
          <el-switch
            v-model="row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeState(row)">
          </el-switch>
        </template>
      </el-table-column>
       <el-table-column
        prop="address"
        label="操作">
        <template v-slot:default="{row}">
          <el-button @click="showEditDialog(row)" type="primary" icon="el-icon-edit" circle plain  size="small" ></el-button>
          <el-button @click="deleteUser(row.id)" type="danger" icon="el-icon-delete" circle plain size="small" ></el-button>
           <el-button type="success" icon="el-icon-edit"  plain size="small" round >分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
  <!-- 分页 -->
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8,10]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 <!-- 添加框 -->
<el-dialog
  title="添加用户"
  :visible.sync="addDialogVisible"
  width="35%">
<el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px" status-icon>
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
   <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password "></el-input>
  </el-form-item>
   <el-form-item label="邮箱"  prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
   <el-form-item label="手机" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>

<!-- 修改框 -->
<el-dialog
  title="修改用户"
  :visible.sync="editDialogVisible"
  width="35%"
>
<el-form ref="editForm" :rules="rules" :model="editForm" label-width="80px" status-icon>
  <el-form-item label="用户名" prop="username">
    <!-- <el-input v-model="editForm.username"></el-input> -->
    <el-tag type="info">{{editForm.username}}</el-tag>
  </el-form-item>
   <el-form-item label="邮箱"  prop="email">
    <el-input placeholder="请输入用户邮箱"  v-model="editForm.email"></el-input>
  </el-form-item>
   <el-form-item label="手机" prop="mobile">
    <el-input placeholder="请输入用户手机" v-model="editForm.mobile"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入有效的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号', trigger: 'blur' }
        ]

      },
      editDialogVisible: false,
      editForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  created () {
    this.getUrlList()
  },
  methods: {
    getUrlList () {
      this.axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
        // 加上请求头token
        // headers: {
        //   Authorization: localStorage.getItem('token')
        // }
      })
        .then(res => {
          const { meta, data } = res
          if (meta.status === 200) {
            this.tableData = data.users
            this.total = data.total
          }
          console.log(res)
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.getUrlList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUrlList()
    },
    queryUser () {
      this.pagenum = 1
      this.getUrlList()
    },
    deleteUser (id) {
      // console.log(id)
      // 给提示
      this.$confirm('你确定要删除吗?', '温馨提示', {
        type: 'warning'
      })
        .then(() => {
          // 退出发送ajax
          this.axios.delete(`users/${id}`, {
            // headers: {
            //   Authorization: localStorage.getItem('token')
            // }
          }).then(res => {
            if (res.meta.status === 200) {
              this.$message.success('删除成功')
              // 如果当前页被删除就剩下一条了,应该让pagenum -1
              if (this.tableData === 1 && this.pagenum > 1) {
                this.pagenum--
              }
              this.getUrlList()
            }
          })
        })
        .catch(() => {
          this.$message('操作取消')
        })
    },
    changeState ({ id, mg_state: state }) {
      // console.log(user)
      this.axios.put(`users/${id}/state/${state}`).then(res => {
        const { status, msg } = res.meta
        if (status === 200) {
          this.$message.success('修改状态成功')
        } else {
          this.$message.error(msg)
        }
      })
    },
    showAddDialog () {
      this.addDialogVisible = true
    },
    addUser () {
      this.$refs.addForm.validate(valid => {
        if (!valid) return false
        // 成功就发送ajax 请求
        this.axios.post('users', this.addForm).then(res => {
          console.log(res)
          const { status, msg } = res.meta
          if (status === 201) {
            this.$message.success('创建成功')
            // 重置表单
            this.$refs.addForm.resetFields()
            // 对话框隐藏
            this.addDialogVisible = false
          } else {
            this.$message.error(msg)
          }
        })
      })
    },
    showEditDialog (user) {
      this.editDialogVisible = true
      // console.log(user)
      // this.editForm.id = user.id
      // this.editForm.email = user.email
      // this.editForm.mobile = user.mobile
      this.editForm = { ...user }
    },
    editUser () {
      this.$refs.editForm.validate(valid => {
        if (!valid) return false
        // 成功就发送ajax请求
        const { id, email, mobile } = this.editForm
        this.axios.put(`users/${id}`, { email, mobile }).then(res => {
          // console.log(res)
          const { status, msg } = res.data
          if (status === 200) {
            this.$message.success('修改成功')
          } else {
            this.$meaasge.error(msg)
          }
          // 重置表单
          this.$refs.editForm.resetFields()
          // 修改成功,模态框隐藏
          this.editDialogVisible = false
          // 更新当前页
          this.getUrlList()
        })
      })
    }
  }
}

</script>

<style lang="less" scoped>
  .el-breadcrumb {
    padding-left: 10px;
    height: 40px;
    line-height: 40px;
    background: #ddd;
  }

</style>
