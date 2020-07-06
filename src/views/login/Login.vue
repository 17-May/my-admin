<template>
  <div class="login">
    <div class="login-box">
      <div class="img">
        <img src="~assets/img/logo.png" />
      </div>
      <el-form :rules="rules" ref="loginForm" :model="login_form">
        <el-form-item prop="username">
          <el-input v-model="login_form.username">
            <i class="iconfont icon-user" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="login_form.password" type="password">
            <i class="iconfont icon-3702mima" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="login_btn">
          <el-button type="primary" @click="loginClick">登录</el-button>
          <el-button type="info" @click="resetClick">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reqLogin } from "network/api";
export default {
  name: "Login",
  data() {
    return {
      login_form: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetClick() {
      this.$refs.loginForm.resetFields();
    },
    loginClick() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          return;
        }
        //发登录请求
        const result = await reqLogin(this.login_form);
        const { status, msg } = result.meta;
        if (status !== 200) {
          //登录失败
          return this.$message.error(msg);
        }
        //登录成功
        // 保存token
        const { token } = result.data;
        sessionStorage.setItem("token", token);
        this.$message({
          message: "登录成功",
          type: "success",
          duration: 500
        });
        //跳转页面
        this.$router.replace("/home");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-box {
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    position: relative;
    .img {
      width: 152px;
      height: 152px;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      box-shadow: 0 0 10px #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        background-color: #eeeeee;
      }
    }
    .el-form {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 20px;
      .login_btn {
        text-align: right;
      }
    }
  }
}
</style>