<template>
  <div>
    <BreadcrumbNav :items="['首页','用户管理','用户列表']"></BreadcrumbNav>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索栏 -->
      <el-row :gutter="20" class="search">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="usersParams.query"
            clearable
            @clear="clearSearchBtn"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUser">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" prop="username" label="姓名"></el-table-column>
        <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
        <el-table-column align="center" prop="mobile" label="电话"></el-table-column>
        <el-table-column align="center" prop="role_name" label="角色"></el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="status">
            <el-switch v-model="status.row.mg_state" @change="changeStatus(status.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <!-- 修改用户 -->
            <el-tooltip class="item" effect="dark" content="修改用户" placement="top">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="alterUser(scope.row)"
              ></el-button>
            </el-tooltip>
            <!--删除用户 -->
            <el-tooltip class="item" effect="dark" content="删除用户" placement="top">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="delUser(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- 分配角色 -->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button
                type="warning"
                size="mini"
                icon="el-icon-setting"
                @click="allotRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="usersParams.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加或修改用户 -->
    <UserAddEdit
      ref="UserAddEdit"
      :usersInfo="usersInfo"
      @addUpdateUserList="addUpdateUserList"
      @clearUsersInfo="clearUsersInfo"
    ></UserAddEdit>

    <!-- 分配用户 -->
    <UserAllotRole
      ref="UserAllotRole"
      :rolesInfo="rolesInfo"
      :rolesList="rolesList"
      @addUpdateUserList="addUpdateUserList"
    ></UserAllotRole>
  </div>
</template>

<script>
import BreadcrumbNav from "components/BreadcrumbNav";
import { reqUsers, reqStatus, reqDelUser, reqRoleList } from "network/api";
import UserAddEdit from "views/home/users/childrens/UserAddEdit";
import UserAllotRole from "views/home/users/childrens/UserAllotRole";

export default {
  name: "Users",
  components: {
    BreadcrumbNav,
    UserAddEdit,
    UserAllotRole
  },
  created() {
    this.reqUsers();
  },
  data() {
    return {
      //表格数据
      tableData: [],
      //请求参数 query查询参数 pagenum当前页码 pagesize每页显示条数
      usersParams: {
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      //总条数
      total: 0,
      //用户的数据
      usersInfo: {},
      //角色数据
      rolesInfo: {},
      //权限列表
      rolesList: []
    };
  },
  methods: {
    //请求列表数据
    async reqUsers() {
      const result = await reqUsers(this.usersParams);
      if (result.meta.status !== 200)
        return this.$message.error("请求用户列表失败");
      const { users, total } = result.data;
      this.total = total;
      this.tableData = users;
    },
    //获取每页多少条
    handleSizeChange(size) {
      this.usersParams.pagesize = size;
      this.reqUsers();
    },
    //获取用户列表当前页码
    handleCurrentChange(page) {
      this.usersParams.pagenum = page;
      this.reqUsers();
    },
    //搜索
    searchBtn() {
      this.usersParams.pagenum = 1;
      this.reqUsers();
    },
    //清空搜索栏
    clearSearchBtn() {
      this.reqUsers();
    },
    //改变状态
    async changeStatus(userInfo) {
      const { id, mg_state } = userInfo;
      const result = await reqStatus(id, mg_state);
      if (result.meta.status !== 200)
        return this.$message.error(result.meta.msg);
      this.$message.success("用户状态改变成功");
    },
    //添加用户
    addUser() {
      this.usersInfo = {};
      this.$refs.UserAddEdit.dialogVisible = true;
    },
    //修改用户
    alterUser(usersInfo) {
      this.usersInfo = usersInfo;
      this.$refs.UserAddEdit.dialogVisible = true;
    },
    //清除usersInfo 数据
    clearUsersInfo() {
      this.usersInfo = {};
    },
    //重新渲染页面
    addUpdateUserList() {
      this.reqUsers();
    },
    //删除用户
    delUser(value) {
      //删除
      this.$confirm("是否删除" + value.username + "?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const reslut = await reqDelUser(value.id);
          if (reslut.meta.status !== 200)
            return this.$message.error(reslut.meta.msg);
          this.$message.success("删除用户成功");
          this.reqUsers();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //分配角色,权限列表
    async allotRole(value) {
      this.rolesInfo = value;
      this.$refs.UserAllotRole.dialogVisible = true;
      const result = await reqRoleList();
      if (result.meta.status !== 200)
        return this.$message.error(result.meta.msg);
      // this.$message.success("获取权限成功");
      this.rolesList = result.data;
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 15px;
}
</style>