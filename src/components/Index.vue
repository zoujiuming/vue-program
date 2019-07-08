<template>
  <div>这是首页
    <el-button type="success" plain>这是按钮</el-button>
    <el-button type="danger" round>确认</el-button>
     <el-switch v-model="value" active-color="#13ce66"
  inactive-color="#ff4949"></el-switch>
  </div>

</template>

<script>
export default {
  data () {
    return {
      value: false
    }
  }
}
</script>

<style>

</style>
