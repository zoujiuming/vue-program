<template>
<div class="users">
  <!-- 面包屑 -->
  <!-- 搜索栏 -->
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
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
       <el-table-column
        prop="address"
        label="操作">
        <template v-slot="scope">
          <el-button type="primary" icon="el-icon-edit" circle plain  size="small" ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle plain size="small" ></el-button>
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
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0
    }
  },
  created () {
    this.getUrlList()
  },
  methods: {
    getUrlList () {
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        },
        // 加上请求头token
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
        .then(res => {
          const { meta, data } = res.data
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
    }
  }
}
</script>

<style>

</style>
