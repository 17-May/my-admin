<template>
  <el-container class="home">
    <el-header>
      <div class="logo">
        <img src="~assets/img/logo.png" alt />
        <h1>电商后台管理系统</h1>
      </div>
      <el-button type="info" @click="exit">退出</el-button>
    </el-header>
    <el-container class="home-main">
      <!-- 左侧边栏 -->
      <el-aside :width="menuTogFlag ? '64px' : '200px'">
        <div class="toggle" @click="togClick">| | |</div>
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          router
          :default-active="activePath"
          :collapse="menuTogFlag"
          :collapse-transition="false"
        >
          <el-submenu v-for="item in menuLists" :index="item.path" :key="item.id">
            <template slot="title">
              <i :class="iconLists[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item v-for="cItem in item.children" :index="cItem.path" :key="cItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{cItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { reqMenu } from "network/api";
export default {
  name: "Home",
  created() {
    this.reqMenu();
  },
  data() {
    return {
      //左侧边栏信息
      menuLists: [],
      //左侧边栏 icon图标数据
      iconLists: {
        "125": "iconfont icon-user",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiao"
      },
      menuTogFlag: false
    };
  },
  methods: {
    //获取左侧菜单栏信息
    async reqMenu() {
      const result = await reqMenu();
      this.menuLists = result.data;
    },
    //退出登录
    exit() {
      this.$confirm("请问是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push("/login");
        sessionStorage.clear();
        this.$message({
          type: "info",
          message: "成功退出登录",
          duration: 500
        });
      });
    },
    //侧边栏层叠切换
    togClick() {
      this.menuTogFlag = !this.menuTogFlag;
    }
  },
  computed: {
    //激活当前路径路由
    activePath() {
      const chilePath = [];
      this.menuLists.forEach(item => {
        item.children.forEach(cItem => {
          chilePath.push(cItem.path);
        });
      });
      const cItem = chilePath.find(item => {
        return this.$route.path.indexOf(item) >= 0;
      });
      return cItem;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      height: 56px;
      display: flex;
      img {
        width: 61px;
        height: 100%;
      }
      h1 {
        color: #ffffff;
        margin-left: 20px;
        line-height: 56px;
        font-size: 20px;
      }
    }
  }
  .home-main {
    height: 100%;
    .toggle {
      background-color: #4a5064;
      color: #fff;
      text-align: center;
      line-height: 24px;
      font-size: 10px;
    }
    .el-menu {
      border-right: none;
    }
    .el-aside {
      background-color: #373d41;
    }
    .el-main {
      background-color: #eaedf1;
    }
  }
}
.iconfont {
  margin-right: 10px;
}
</style>