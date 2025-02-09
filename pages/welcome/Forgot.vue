<template>
    <view class="login-bg">
      <view class="custom-container">
        <!-- Logo -->
        <view class="custom-center">
          <image src="/static/index/img/logo_2.png" class="custom-logo" mode="widthFix" />
          <text class="custom-title">找回密码</text>
          <text class="custom-subtitle">请验证您的身份以重置密码</text>
        </view>
  
        <!-- 忘记密码表单 -->
        <view class="card forgot">
          <view class="card-body custom-card-body">
            <!-- 输入手机号码 -->
            <view class="form-group">
              <label class="form-label">手机号码</label>
              <input v-model="phone" type="tel" maxlength="11" class="form-control" placeholder="请输入您的手机号码" />
            </view>
  
            <!-- 图形验证码 -->
            <view class="form-group relative">
              <label class="form-label">图形验证码</label>
              <view class="relative">
                <input v-model="captcha" type="text" maxlength="3" class="form-control captcha-input" placeholder="数字验证码" />
                <image class="captcha" :src="captchaImage" @click="refreshCaptcha" mode="widthFix" />
              </view>
            </view>
  
            <!-- 手机验证码 -->
            <view class="form-group relative">
              <label class="form-label">手机验证码</label>
              <view class="relative">
                <input v-model="verifyCode" type="text" maxlength="6" class="form-control captcha-input" placeholder="请输入手机验证码" />
                <button class="get-captcha" @click="sendCaptcha">{{ countdownText }}</button>
              </view>
            </view>
  
            <!-- 下一步按钮 -->
            <view class="form-footer">
              <button class="custom-button custom-primary" @click="resetPassword">继续，下一步</button>
            </view>
          </view>
        </view>
  
        <!-- 底部链接 -->
        <view class="custom-footer">
          <navigator url="/pages/login/login">算了，我再想想！</navigator>
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
        verifyCode: "",
        captchaImage: "/api/captcha",
        countdown: 0,
      };
    },
    computed: {
      countdownText() {
        return this.countdown > 0 ? `${this.countdown}s 后重发` : "获取验证码";
      },
    },
    methods: {
      refreshCaptcha() {
        this.captchaImage = `/api/captcha?time=${new Date().getTime()}`;
      },
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
          data: { phone: this.phone, type: "forgot" },
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
      resetPassword() {
        if (!this.phone || !this.captcha || !this.verifyCode) {
          uni.showToast({ title: "请填写完整信息", icon: "none" });
          return;
        }
  
        uni.request({
          url: "/api/forgotPassword",
          method: "POST",
          data: {
            phone: this.phone,
            captcha: this.captcha,
            verifyCode: this.verifyCode,
          },
          success: (res) => {
            if (res.data.code === 200) {
              uni.showToast({ title: "验证成功，请设置新密码", icon: "success" });
              uni.navigateTo({ url: "/pages/reset/reset" });
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
  @import "//static/css/forgot.css";
  </style>
  