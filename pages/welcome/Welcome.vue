<template>
    <view class="welcome-bg">
      <!-- 主容器 -->
      <view class="custom-container">
        <!-- 第一模块：Logo 和欢迎语 -->
        <view class="custom-center">
          <image src="/static/index/img/logo_2.png" class="custom-logo" mode="widthFix" />
          <text class="custom-title">绿步致远 健康盈途</text>
          <view class="custom-description">
            <view class="custom-images">
              <image src="/static/index/img/welcome01.png" class="description-img" mode="widthFix" />
              <image src="/static/index/img/welcome02.png" class="description-img" mode="widthFix" />
              <image src="/static/index/img/welcome03.png" class="description-img" mode="widthFix" />
            </view>
          </view>
        </view>
  
        <!-- 第二模块：按钮 -->
        <view class="login-bg">
          <view class="card-body custom-card-body">
            <button class="custom-btn-secondary" @click="navigateTo('/pages/signin/signin')">已有账号登录</button>
            <button class="custom-btn-primary" @click="navigateTo('/pages/signup/signup')">注册新的账号</button>
          </view>
        </view>
  
        <!-- 第三模块：页脚 -->
        <view class="custom-footer">
          <text>倡导环保健康的生活方式指南。</text>
          <navigator url="/pages/about/about" open-type="navigate">了解更多关于我们</navigator>
        </view>
  
        <!-- 版权声明 -->
        <view class="custom-copyright">
          © 2023 绿步盈途. 保留所有权利.
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(url) {
        uni.navigateTo({ url });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/welcome.css";
  </style>
  