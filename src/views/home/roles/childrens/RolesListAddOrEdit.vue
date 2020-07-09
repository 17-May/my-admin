<template>
  <div>
    <el-dialog
      :title="!isRoleFlag ?'编辑角色':'添加角色' "
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :model="rolesListInfo"
        ref="rolesList"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="rolesListInfo.roleName" :disabled="!isRoleFlag"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
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
import { regAddRole, regEditRole } from "network/api";
export default {
  name: "RolesListAddOrEdit",
  props: {
    //重新渲染页面
    getRolesList: {
      type: Function
    },
    //当前角色信息
    roleInfo: {
      type: Object
    }
  },
  data() {
    return {
      dialogVisible: false,
      //输入的角色信息
      rolesListInfo: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击xx 取消
    handleClose() {
      this.dialogVisible = false;
      this.$emit("clearRoleInfo");
    },
    //添加角色
    addRole() {
      this.$refs.rolesList.validate(async boo => {
        if (!boo) return;
        if (this.isRoleFlag) {
          //添加角色
          const result = await regAddRole(this.rolesListInfo);
          if (result.meta.status !== 201)
            return this.$message.error(result.meta.msg);
          console.log(result);
          this.dialogVisible = false;
          this.$message.success("添加角色成功");
          this.getRolesList();
        } else {
          //编辑角色
          const result = await regEditRole(
            this.roleInfo.roleId,
            this.rolesListInfo
          );
          if (result.meta.status !== 200)
            return this.$message.error(result.meta.msg);
          this.dialogVisible = false;
          this.$message.success("编辑角色成功");
          this.getRolesList();
        }
      });
    }
  },
  computed: {
    isRoleFlag() {
      return !this.roleInfo.roleId || !this.roleInfo.roleName;
    }
  },
  watch: {
    roleInfo(newValue) {
      this.rolesListInfo.roleName = newValue.roleName;
    }
  }
};
</script>

<style lang="less" scoped>
</style>