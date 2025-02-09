<template>
    <view class="login-bg">
      <view class="custom-container">
        <!-- Logo -->
        <view class="custom-center">
          <image src="/static/index/img/logo_2.png" class="custom-logo" mode="widthFix" />
          <text class="custom-title">欢迎回来，请您登录</text>
        </view>
  
        <!-- 登录表单 -->
        <view class="card signin">
          <view class="card-body custom-card-body">
            <!-- 手机号码 -->
            <view class="form-group">
              <label class="form-label">手机号码</label>
              <input v-model="phone" type="tel" maxlength="11" class="form-control" placeholder="手机号码" />
            </view>
  
            <!-- 登录密码 -->
            <view class="form-group">
              <label class="form-label">
                登录密码
                <navigator url="/pages/forgot/forgot" class="float-right small">忘记密码</navigator>
              </label>
              <input v-model="password" type="password" maxlength="32" class="form-control" placeholder="请在此输入" />
            </view>
  
            <!-- 登录按钮 -->
            <view class="form-footer">
              <button class="custom-button custom-primary" @click="login">账 号 登 录</button>
            </view>
          </view>
        </view>
  
        <!-- 底部链接 -->
        <view class="custom-footer">
          <navigator url="/pages/signup/signup">还没有帐户? 立即注册</navigator>
        </view>
  
        <!-- 版权信息 -->
        <view class="custom-copyright">© 2024 绿步盈途. 保留所有权利.</view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        phone: "",
        password: "",
      };
    },
    methods: {
      login() {
        if (!this.phone || !this.password) {
          uni.showToast({ title: "请输入账号和密码", icon: "none" });
          return;
        }
  
        uni.request({
          url: "/api/login",
          method: "POST",
          data: {
            phone: this.phone,
            password: this.password,
          },
          success: (res) => {
            if (res.data.code === 200) {
              uni.setStorageSync("token", res.data.token);
              uni.showToast({ title: "登录成功", icon: "success" });
              uni.reLaunch({ url: "/pages/index/index" });
            } else {
              uni.showToast({ title: res.data.message, icon: "none" });
            }
          },
          fail: () => {
            uni.showToast({ title: "网络错误，请稍后重试", icon: "none" });
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/login.css";
  </style>
  