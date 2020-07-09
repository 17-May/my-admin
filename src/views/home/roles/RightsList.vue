<template>
  <div>
    <BreadcrumbNav :items="['首页','权限管理','权限列表']"></BreadcrumbNav>
    <el-card>
      <el-table :data="rightsList" style="width: 100%" border>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="authName" label="权限名称" align="center"></el-table-column>
        <el-table-column prop="path" label="路径" align="center"></el-table-column>
        <el-table-column prop="level" label="权限等级" align="center">
          <template slot-scope="scope">
            <div>
              <el-tag size="mini" v-if="scope.row.level === '0'">标签一</el-tag>
              <el-tag type="success" size="mini" v-else-if="scope.row.level === '1'">标签一</el-tag>
              <el-tag type="warning" size="mini" v-else>标签一</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import BreadcrumbNav from "components/BreadcrumbNav";
import { reqRights } from "network/api";
export default {
  name: "RightsList",
  data() {
    return {
      rightsList: []
    };
  },
  components: {
    BreadcrumbNav
  },
  created() {
    this.getRightsList();
  },
  methods: {
    async getRightsList() {
      const result = await reqRights("list");
      if (result.meta.status !== 200)
        return this.$message.error(result.meta.msg);
      this.rightsList = result.data;
      console.log(result);
    }
  }
};
</script>

<style lang="less" scoped>
</style>