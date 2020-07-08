<template>
  <div>
    <el-dialog
      :title="!isUserFlag ?'添加用户':'添加角色' "
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="rolesListInfo"
        ref="userList"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="rolesListInfo.roleName" :disabled="!isUserFlag"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" v-if="isUserFlag">
          <el-input v-model="rolesListInfo.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { regAddRole } from "network/api";
export default {
  name: "RolesListAddOrEdit",
  data() {
    return {
      dialogVisible: false,
      //输入的角色信息
      rolesListInfo: {
        roleName: "",
        roleDesc: ""
      },
      isUserFlag: true,
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    //点击xx 取消
    handleClose() {
      this.dialogVisible = false;
    },
    //添加角色
    async addRole() {
      // const result = await regAddRole(this.rolesListInfo);
      // if (result.meta.status !== 200)
      //   return this.$message.error(result.meta.msg);
      // console.log(result);
      // this.dialogVisible = false;
      // this.$message.success("添加角色成功");
    }
  }
};
</script>

<style lang="less" scoped>
</style>