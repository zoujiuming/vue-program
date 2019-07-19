<template>
  <div class="goods">
    <!-- 添加商品按钮 -->
      <el-button type="success" plain @click="$router.push('/goods-add')">添加商品</el-button>
      <!-- main -->
       <el-table :data="goodsList" v-loading="loading">
    <el-table-column
         type="index"
      :index="indexMethod"
      width="50">
    </el-table-column>
    <el-table-column
    prop="goods_name"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="商品价格">
    </el-table-column>
    <el-table-column
      prop="goods_weight"
      label="商品重量">
    </el-table-column>
    <el-table-column
      prop="add_time"
      label="创建时间">
      <template v-slot="{row}">
        {{row.add_time | dateFilter}}
      </template>
    </el-table-column>
    <el-table-column
      prop="path"
      label="操作">
     <template v-slot="{row}">
      <el-button type="primary" icon="el-icon-edit" circle plain  size="small" ></el-button>
        <el-button  type="danger" icon="el-icon-delete" circle plain size="small" ></el-button>
     </template>
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
      goodsList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      loading: true
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    async  getGoodsList () {
      const res = await this.axios.get('goods', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      const { meta, data } = res
      console.log(res)

      if (meta.status === 200) {
        this.loading = false
        this.goodsList = data.goods
        this.total = data.total
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getGoodsList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getGoodsList()
    },
    indexMethod (index) {
      return (this.pagenum - 1) * this.pagesize + index + 1
    }
  }
}
</script>

<style>

</style>
