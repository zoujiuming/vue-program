<template>
  <div class="categories">
    <!-- 添加分类按钮 -->
      <el-button @click="showAdd" type="success" plain>添加分类</el-button>
    <!-- main -->
     <el-table :data="categoriesList" v-loading="loading">
    <el-table-tree-column
      prop="cat_name"
      label="分类名称"  treeKey="cat_id"  folder-icon="" parent-key="cat_pid" level-key="cat_level"  :indent-size="20">
    </el-table-tree-column >
    <el-table-column
      label="是否有效">
      <template v-slot:default="{row}">
        {{row.cat_deleted ? '否':'是'}}
      </template>
    </el-table-column>
    <el-table-column
      prop="cat_level"
      label="排序">
    </el-table-column>
    <el-table-column
      prop="path"
      label="操作">
      <el-button type="primary" icon="el-icon-edit" circle plain  size="small" ></el-button>
          <el-button  type="danger" icon="el-icon-delete" circle plain size="small" ></el-button>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加用户框 -->
    <el-dialog
  title="添加分类"
  :visible.sync="addDialogVisible"
  width="35%">
<el-form ref="addForm" :rules="rules" :model="addForm" label-width="80px" status-icon>
  <el-form-item label="分类名称" prop="cat_name">
    <el-input v-model="addForm.cat_name" placeholder="请输入分类名称"></el-input>
  </el-form-item>
   <el-form-item label="父级名称" prop="cat_pid">
     <!-- 级联选择器 -->
  <div class="block">
    <el-cascader
     v-model="addForm.cat_pid"
    :options="options"
    :props="props"
    clearable></el-cascader>
  </div>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button @click="addCategories" type="primary">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoriesList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      loading: true,
      addDialogVisible: false,
      addForm: {
        cat_name: '',
        cat_pid: [],
        cat_level: ''
      },
      rules: {
        cat_name: [
          { required: true, message: '分类名称不能为空', trigger: ['change', 'blur'] }
        ]
      },
      options: [],
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  created () {
    this.getCategoriesList()
  },
  methods: {
    async getCategoriesList () {
      const res = await this.axios.get(`categories`, {
        params: {
          type: 3,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      const { meta, data } = res
      // console.log(res)
      if (meta.status === 200) {
        this.categoriesList = data.result
        // this.pagenum = data.pagenumn
        // this.pagesize = data.pagesize
        this.total = data.total
      }
      this.loading = false
      // console.log(res)
      // this.categoriesList = res.data
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getCategoriesList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getCategoriesList()
    },
    async showAdd () {
      this.addDialogVisible = true
      // 发送ajax请求
      const res = await this.axios.get('categories?type=2')
      // console.log(res)
      const { meta, data } = res
      if (meta.status === 200) {
        // 把数据给级联菜单
        this.options = data
      }
    },
    async addCategories () {
      try {
        await this.$refs.addForm.validate()
        // 发送ajax请求
        // console.log(this.addForm.cat_pid)
        const res = await this.axios.post('categories', {
          cat_name: this.addForm.cat_name,
          cat_level: this.addForm.cat_pid.length,
          cat_pid: this.addForm.cat_pid[this.addForm.cat_pid.length - 1] || 0
        })
        console.log(res)
        const { status, msg } = res.meta
        if (status === 201) {
          this.$message.success(msg)
          this.addDialogVisible = false
          // 清空
          this.$refs.addForm.resetFields()
        } else {
          this.$message.error(msg)
        }
      } catch {

      }
    }
  }

}
</script>

<style>

</style>
