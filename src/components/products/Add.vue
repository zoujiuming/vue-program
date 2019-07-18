<template>
  <div class="add">
    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success">
  <el-step title="步骤 1" description="基本信息"></el-step>
  <el-step title="步骤 2" description="商品图片"></el-step>
  <el-step title="步骤 3" description="商品内容"></el-step>
</el-steps>
<!-- tabs标签页 -->
<el-tabs v-model="activeTab" tab-position="left" @tab-click="handleClick">
    <el-tab-pane name="tab0" label="基本信息" >
      <el-form :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price"  placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.goods_weight"  placeholder="请输入商品重量"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.goods_number"  placeholder="请输入商品数量"></el-input>
        </el-form-item >
        <el-form-item label="商品分类">
          <el-cascader
            v-model="form.goods_cat"
            :options="options"
            :props="props"
            ></el-cascader>
        </el-form-item>
        <el-form-item label="是否促销">
          <el-radio v-model="form.is_promote" :label="true">是</el-radio>
          <el-radio v-model="form.is_promote" :label="false">否</el-radio>
        </el-form-item >
      <el-form-item>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane name="tab1" label="商品图片">
        <el-upload
        :on-success="handleSuccess"
      action="http://localhost:8888/api/private/v1/upload"
      list-type="picture-card"
    >
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{file}">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url" alt=""
          >
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
    </el-upload>
      <el-button type="primary" @click="next">下一步</el-button>
    </el-tab-pane>
    <el-tab-pane name="tab2" label="角色管理">
      <!-- bidirectional data binding（双向数据绑定） -->
      <quill-editor v-model="form.goods_introduce"></quill-editor>
      <el-button type="primary" @click="addGood">添 加</el-button>
    </el-tab-pane>
  </el-tabs>

  </div>
</template>

<script>
export default {
  async created () {
    const res = await this.axios.get('categories?type=3')
    // console.log(res)
    const { meta, data } = res
    if (meta.status === 200) {
      // 把数据给级联菜单
      this.options = data
    }
  },
  data () {
    return {
      headers: {
        Authorization: localStorage.getItem('token')
      },
      disabled: false,
      active: 0,
      activeTab: 'tab0',
      form: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_introduce: '',
        pics: [],
        is_promote: false

      },
      options: [],
      props: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      }
    }
  },
  methods: {

    next () {
      // if (this.active++ > 2) this.active = 0
      this.active++
      this.activeTab = 'tab' + this.active
    },
    handleClick (tab) {
      console.log(tab.index)
      this.active = +tab.index
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload (file) {
      console.log(file)
    },
    handleSuccess (res, file, fileList) {
      if (res.meta.status === 200) {
        this.form.pics.push({
          pic: res.data.tmp_path
        })
      }
    },
    async addGood () {
      const res = await this.axios.post('goods', {
        ...this.form,
        // 把数组修改为字符串
        goods_cat: this.form.goods_cat.join()
      })
      // console.log(res)
      const { status, msg } = res.meta
      if (status === 201) {
        this.$message.success(msg)
        this.$router.push('/goods')
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>

</style>
