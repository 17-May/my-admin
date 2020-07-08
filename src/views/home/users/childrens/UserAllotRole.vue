<template>
  <div>
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <p>当前的用户：{{rolesInfo.username}}</p>
      <br />
      <p>当前的角色：{{rolesInfo.role_name}}</p>
      <br />分配新角色：
      <el-select v-model="selectId" placeholder="请选择">
        <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setAllotRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqAllotRole } from "network/api";
export default {
  name: "UserAllotRole",
  props: {
    //角色数据
    rolesInfo: {
      type: Object
    },
    //角色列表
    rolesList: {
      type: Array
    }
  },
  data() {
    return {
      dialogVisible: false,
      selectId: ""
    };
  },
  methods: {
    handleClose() {
      this.selectId = "";
      this.dialogVisible = false;
    },
    //分配角色
    async setAllotRole() {
      //用户id
      const userId = this.rolesInfo.id;
      //角色id
      const rId = this.selectId;
      if (!rId) return this.$message.error("请选择分配的角色");
      const result = await reqAllotRole(userId, rId);
      if (result.meta.status !== 200)
        return this.$message.error(result.meta.msg);
      this.$message.success("修改用户成功");
      this.dialogVisible = false;
      this.selectId = "";
      this.$emit("addUpdateUserList");
    }
  }
};
</script>

<style lang="less" scoped>
</style>