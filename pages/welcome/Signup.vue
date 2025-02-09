<template>
    <view class="login-bg">
      <view class="custom-container">
        <!-- Logo -->
        <view class="custom-center">
          <image src="/static/index/img/logo_2.png" class="custom-logo" mode="widthFix" />
          <text class="custom-title">欢迎加入绿步盈途</text>
        </view>
  
        <!-- 注册表单 -->
        <view class="card signup">
          <view class="card-body custom-card-body">
            <!-- 手机号码 -->
            <view class="form-group">
              <label class="form-label">手机号码</label>
              <input v-model="phone" type="tel" class="form-control" placeholder="请输入手机号" />
            </view>
  
            <!-- 验证码 -->
            <view class="form-group relative">
              <label class="form-label">验证码</label>
              <view class="relative">
                <input v-model="captcha" type="text" maxlength="6" class="form-control captcha-input" placeholder="请输入验证码" />
                <button class="get-captcha" @click="sendCaptcha">{{ countdownText }}</button>
              </view>
            </view>
  
            <!-- 邀请码 -->
            <view class="form-group">
              <label class="form-label">邀请码</label>
              <input v-model="inviter" type="text" class="form-control" placeholder="请输入邀请码（可选）" />
            </view>
  
            <!-- 设置密码 -->
            <view class="form-group">
              <label class="form-label">设置密码</label>
              <input v-model="password" type="password" class="form-control" placeholder="请设置密码" />
            </view>
  
            <!-- 确认密码 -->
            <view class="form-group">
              <label class="form-label">确认密码</label>
              <input v-model="confirmPassword" type="password" class="form-control" placeholder="请确认密码" />
            </view>
  
            <!-- 注册按钮 -->
            <view class="form-footer">
              <button class="custom-button custom-primary" @click="register">注 册</button>
            </view>
  
            <!-- 已有账号 -->
            <view class="custom-footer">
              <navigator url="/pages/login/login">已有账号？立即登录</navigator>
            </view>
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        phone: "",
        captcha: "",
        inviter: "",
        password: "",
        confirmPassword: "",
        countdown: 0,
      };
    },
    computed: {
      countdownText() {
        return this.countdown > 0 ? `${this.countdown}s 后重发` : "获取验证码";
      },
    },
    methods: {
      sendCaptcha() {
        if (!/^1[3-9]\d{9}$/.test(this.phone)) {
          uni.showToast({ title: "手机号格式错误", icon: "none" });
          return;
        }
  
        if (this.countdown > 0) return;
  
        this.countdown = 60;
        let timer = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) clearInterval(timer);
        }, 1000);
  
        uni.request({
          url: "/api/sendCode",
          method: "POST",
          data: { phone: this.phone, type: "signup" },
          success: (res) => {
            if (res.data.code !== 200) {
              uni.showToast({ title: res.data.message, icon: "none" });
              this.countdown = 0;
            } else {
              uni.showToast({ title: "验证码已发送", icon: "success" });
            }
          },
          fail: () => {
            uni.showToast({ title: "网络错误，请稍后重试", icon: "none" });
            this.countdown = 0;
          },
        });
      },
      register() {
        if (!this.phone || !this.captcha || !this.password || !this.confirmPassword) {
          uni.showToast({ title: "请填写完整信息", icon: "none" });
          return;
        }
        if (this.password !== this.confirmPassword) {
          uni.showToast({ title: "两次密码输入不一致", icon: "none" });
          return;
        }
  
        uni.request({
          url: "/api/signup",
          method: "POST",
          data: {
            phone: this.phone,
            captcha: this.captcha,
            inviter: this.inviter,
            password: this.password,
          },
          success: (res) => {
            if (res.data.code === 200) {
              uni.showToast({ title: "注册成功", icon: "success" });
              uni.reLaunch({ url: "/pages/login/login" });
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
  @import "//static/css/signup.css";
  </style>
  