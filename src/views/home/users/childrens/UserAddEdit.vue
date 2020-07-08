<template>
  <div>
    <el-dialog
      :title="!isUserFlag ?'添加用户':'修改用户' "
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form
        :rules="rules"
        :model="userList"
        ref="userList"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userList.username" :disabled="!isUserFlag"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="isUserFlag">
          <el-input v-model="userList.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userList.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="userList.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { regMobile } from "tools/mobileTools";
import { reqAddUSer, reqAlterUser } from "network/api";
export default {
  name: "UserAddEdit",
  props: {
    usersInfo: {
      type: Object,
      defaults() {
        return {};
      }
    }
  },
  data() {
    return {
      //是否显示隐藏
      dialogVisible: false,
      //用户数据列表
      userList: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //用户id
      userId: 0,
      //验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: regMobile, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击xx 隐藏
    handleClose() {
      this.$refs.userList.resetFields();
      this.$emit("clearUsersInfo");
      this.dialogVisible = false;
    },
    //添加用户
    addUser() {
      // 验证表单
      this.$refs.userList.validate(async boo => {
        //表单没有内容
        if (!boo) return;
        if (this.isUserFlag) {
          //请求用户数据,添加用户
          const result = await reqAddUSer(this.userList);
          if (result.meta.status !== 201)
            return this.$message.error(result.meta.msg);
          this.dialogVisible = false;
          this.$refs.userList.resetFields();
          this.$emit("addUpdateUserList");
          this.$message.success("成功添加用户");
        } else {
          //请求用户数据，修改用户
          const { email, mobile } = this.userList;
          const result = await reqAlterUser(this.userId, email, mobile);
          if (result.meta.status !== 200)
            return this.$message.error(result.meta.msg);
          this.dialogVisible = false;
          this.$refs.userList.resetFields();
          this.$emit("addUpdateUserList");
          this.$message.success("修改用户成功");
        }
      });
    }
  },
  computed: {
    //判断 ture:添加用户 false:修改用户
    isUserFlag() {
      return !this.usersInfo.id || !this.usersInfo.username;
    }
  },
  watch: {
    //将用户信息渲染到页面,修改用户模块
    usersInfo(newValue) {
      const { id, username, email, mobile } = newValue;
      this.userList = { username, email, mobile, password: "" };
      this.userId = id;
    }
  }
};
</script>

<style lang="less" scoped>
</style>