<template>
  <div>
    <el-row v-for="item in rightsInfo" :key="item.id">
      <!-- 一级权限信息 -->
      <el-col :span="6">
        <el-tag closable @close="del(item.id)">{{item.authName}}</el-tag>
        <i class="el-icon-caret-right"></i>
      </el-col>
      <el-col :span="18">
        <!-- 二级权限信息 -->
        <el-row v-for="cItem in item.children" :key="cItem.id">
          <el-col :span="8">
            <el-tag type="success" closable @close="del(cItem.id)">{{cItem.authName}}</el-tag>
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col :span="16">
            <!-- 三级权限信息 -->
            <el-tag
              closable
              @close="del(ccItem.id)"
              type="warning"
              v-for="ccItem in cItem.children"
              :key="ccItem.id"
            >{{ccItem.authName}}</el-tag>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { regDelRights } from "network/api";
export default {
  name: "RolesMenuList",
  props: {
    rightsList: {
      type: Object
    }
  },
  data() {
    return {
      rightsInfo: []
    };
  },
  created() {
    this.rightsInfo = this.rightsList.children;
  },
  methods: {
    //删除指定权限
    del(id) {
      const roleId = this.rightsList.id;
      this.$confirm("此操作将取消该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const result = await regDelRights(roleId, id);
          if (result.meta.status !== 200)
            return this.$message.error(result.meta.msg);
          this.rightsInfo = result.data;
          this.$message.success("取消权限成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "操作已取消"
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 5px;
}
.el-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
  margin: -1px;
}
</style>