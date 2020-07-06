<template>
  <div class="nav">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">{{items[0]}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{items[1]}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{items[2]}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "BreadcrumbNav",
  props: {
    items: {
      request: true,
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  margin-bottom: 20px;
}
</style>