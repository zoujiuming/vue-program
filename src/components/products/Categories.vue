<template>
  <div class="categories">
    <!-- 添加分类按钮 -->
      <el-button type="success" plain>添加按钮</el-button>
    <!-- main -->
     <el-table :data="categoriesList">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      categoriesList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0
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
      console.log(res)
      if (meta.status === 200) {
        this.categoriesList = data.result
        // this.pagenum = data.pagenumn
        // this.pagesize = data.pagesize
        this.total = data.total
      }
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
    }
  }

}
</script>

<style>

</style>
