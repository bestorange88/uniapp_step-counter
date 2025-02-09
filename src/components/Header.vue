<template>
    <view class="header">
      <!-- 返回按钮 -->
      <navigator url="javascript:uni.navigateBack()" class="btn-back">
        <image src="/static/index/img/back.png" class="icon-back" mode="widthFix" />
      </navigator>
  
      <!-- 页面标题 -->
      <text class="page-title">{{ title }}</text>
  
      <!-- 右侧工具栏 -->
      <view class="header-tools">
        <!-- 消息通知按钮 -->
        <navigator url="/pages/news/news" class="btn-message">
          <image src="/static/index/img/message.png" class="icon-message" mode="widthFix" />
        </navigator>
  
        <!-- 用户菜单 -->
        <view class="dropdown">
          <view class="btn-user-menu" @click="toggleMenu">
            <image src="/static/index/img/site.png" class="icon-user-menu" mode="widthFix" />
          </view>
          <view v-if="menuOpen" class="dropdown-menu">
            <navigator class="dropdown-item" url="/pages/profile/profile">个人资料</navigator>
            <navigator class="dropdown-item" url="/pages/reset/reset">修改密码</navigator>
            <navigator class="dropdown-item" url="/pages/authen/authen">实名认证</navigator>
            <view class="dropdown-divider"></view>
            <navigator class="dropdown-item" url="/pages/help/help">玩法规则</navigator>
            <navigator class="dropdown-item" url="/pages/logout/logout">退出登录</navigator>
          </view>
        </view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: "绿步致远 健康盈途",
      },
    },
    data() {
      return {
        menuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.menuOpen = !this.menuOpen;
      },
    },
  };
  </script>
  
  <style scoped>
  @import "/static/css/header.css";
  </style>
  