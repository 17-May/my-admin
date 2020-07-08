<template>
  <div>
    <BreadcrumbNav :items="['首页','权限管理','权限列表']"></BreadcrumbNav>
    <el-card>
      <el-button type="primary" class="addBtn" @click="addRole">添加角色</el-button>
      <!-- 点击> 显示角色权限信息 -->
      <el-table :data="rolesList" style="width: 100%" border>
        <el-table-column align="center" type="expand">
          <template slot-scope="scope">
            <div>
              <RolesMenuList :rolesList="scope.row"></RolesMenuList>
            </div>
          </template>
        </el-table-column>
        <!-- 序号 -->
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template>
            <div>
              <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色 -->
    <RolesListAddOrEdit ref="rolesListInfo"></RolesListAddOrEdit>
  </div>
</template>

<script>
import BreadcrumbNav from "components/BreadcrumbNav";
import { reqRoleList } from "network/api";
import RolesMenuList from "views/home/roles/childrens/RolesMenuList";
import RolesListAddOrEdit from "views/home/roles/childrens/RolesListAddOrEdit";

export default {
  name: "RolesList",
  data() {
    return {
      rolesList: []
    };
  },
  components: {
    BreadcrumbNav,
    RolesMenuList,
    RolesListAddOrEdit
  },
  created() {
    this.getRolesList();
  },
  methods: {
    //获取角色列表
    async getRolesList() {
      const result = await reqRoleList();
      if (result.meta.status !== 200)
        return this.$message.error(result.meta.msg);
      this.rolesList = result.data;
    },
    //添加角色
    addRole() {
      this.$refs.rolesListInfo.dialogVisible = true;
    }
    //重新渲染页面
  }
};
</script>

<style lang="less" scoped>
.addBtn {
  margin-bottom: 20px;
}
</style>