<template>
  <div>
    <BreadcrumbNav :items="['首页','权限管理','权限列表']"></BreadcrumbNav>
    <el-card>
      <el-button type="primary" class="addBtn" @click="addRole">添加角色</el-button>
      <!-- 点击> 显示角色权限信息 -->
      <el-table :data="rightsList" style="width: 100%" border>
        <el-table-column align="center" type="expand">
          <template slot-scope="scope">
            <div>
              <RolesMenuList :rightsList="scope.row"></RolesMenuList>
            </div>
          </template>
        </el-table-column>
        <!-- 序号 -->
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editRole(scope.row)"
              >编辑</el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delRole(scope.row)"
              >删除</el-button>
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="allotRole(scope.row)"
              >分配权限</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色 -->
    <RolesListAddOrEdit
      ref="rolesListInfo"
      :getRolesList="getRolesList"
      :roleInfo="roleInfo"
      @clearRoleInfo="clearRoleInfo"
    ></RolesListAddOrEdit>
    <!-- 分配权限 -->
    <RoleListAllot
      ref="RoleListAllot"
      :roleInfo="roleInfo"
      :rightTree="rightTree"
      @clearRoleInfo="clearRoleInfo"
      :getRolesList="getRolesList"
    ></RoleListAllot>
  </div>
</template>

<script>
import BreadcrumbNav from "components/BreadcrumbNav";
import { reqRoleList, regSearchRole, regDelRole } from "network/api";
import RolesMenuList from "views/home/roles/childrens/RolesMenuList";
import RolesListAddOrEdit from "views/home/roles/childrens/RolesListAddOrEdit";
import RoleListAllot from "views/home/roles/childrens/RoleListAllot";

export default {
  name: "RolesList",
  data() {
    return {
      //权限列表
      rightsList: [],
      //当前所选角色的信息
      roleInfo: {},
      //权限树状列表
      rightTree: {}
    };
  },
  components: {
    BreadcrumbNav,
    RolesMenuList,
    RolesListAddOrEdit,
    RoleListAllot
  },
  created() {
    this.getRolesList();
  },
  methods: {
    //获取角色列表
    async getRolesList() {
      const result = await reqRoleList("list");
      if (result.meta.status !== 200)
        return this.$message.error(result.meta.msg);
      this.rightsList = result.data;
    },
    //添加角色
    addRole() {
      this.roleInfo = {};
      this.$refs.rolesListInfo.dialogVisible = true;
    },
    //编辑角色
    async editRole(roleInfo) {
      this.$refs.rolesListInfo.dialogVisible = true;
      const result = await regSearchRole(roleInfo.id);
      if (result.meta.status !== 200)
        return this.$message.error(result.meta.msg);
      this.roleInfo = result.data;
    },
    //清除usersInfo 数据
    clearRoleInfo() {
      this.roleInfo = {};
    },
    //删除角色
    delRole(roleInfo) {
      this.$confirm("是否删除" + roleInfo.roleName + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const result = await regDelRole(roleInfo.id);
          if (result.meta.status !== 200)
            return this.$message.error(result.meta.msg);
          this.$message.success("删除角色成功");
          this.getRolesList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑权限
    allotRole(roleInfo) {
      this.roleInfo = roleInfo;
      this.$refs.RoleListAllot.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.addBtn {
  margin-bottom: 20px;
}
</style>