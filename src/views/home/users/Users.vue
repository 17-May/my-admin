<template>
  <div>
    <BreadcrumbNav :items="['首页','用户管理','用户列表']"></BreadcrumbNav>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索栏 -->
      <el-row :gutter="20" class="search">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
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
            <el-switch v-model="status.row.mg_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template>
            <el-row>
              <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="usersParams.pagesize"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import BreadcrumbNav from "components/BreadcrumbNav";
import { reqUsers } from "network/api";
export default {
  name: "Users",
  components: {
    BreadcrumbNav
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
      total: 0
    };
  },
  methods: {
    async reqUsers() {
      const result = await reqUsers(this.usersParams);
      if (result.meta.status !== 200)
        return this.$message.error("请求用户列表失败");
      const { users, total } = result.data;
      this.total = total;
      this.tableData = users;
      console.log(result);
    },
    //获取每页多少条
    handleSizeChange(size) {
      this.usersParams.pagesize = size;
      this.reqUsers();
    },
    //获取用户列表
    handleCurrentChange(page) {
      this.usersParams.pagenum = page;
      this.reqUsers();
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 15px;
}
</style>