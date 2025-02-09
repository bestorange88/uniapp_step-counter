<template>
    <Layout title="我的账户">
      <view class="account-container">
        <!-- 个人信息 -->
        <view class="personal-info">
          <!-- 头像 -->
          <view class="avatar-container">
            <image :src="avatarUrl" class="avatar" mode="cover" />
            <navigator class="change-avatar" url="/pages/profile/profile">更换头像</navigator>
          </view>
  
          <!-- 用户信息 -->
          <view class="user-info">
            <text class="nickname">昵称：{{ user.nickname }}</text>
            <text class="level">等级：Lv-{{ user.level }}</text>
            <text class="realname">真实姓名：{{ user.authenStatus }}</text>
            <view class="icons">
              <image src="/static/index/img/id-card.png" class="icon-item" />
              <image src="/static/index/img/credit-card.png" class="icon-item" />
              <image src="/static/index/img/we-chat.png" class="icon-item" />
              <image src="/static/index/img/mobile-phone.png" class="icon-item" />
            </view>
          </view>
        </view>
  
        <!-- 我的钱包 -->
        <view class="wallet">
          <view class="wallet-info">
            <text class="wallet-title">我的钱包</text>
            <text class="wallet-balance">账户余额：{{ wallet.balance }} 元</text>
            <text class="wallet-withdrawable">可提现金额：{{ wallet.withdrawable }} 元</text>
          </view>
          <view class="wallet-actions">
            <navigator url="/pages/withdrawal/withdrawal" class="btn-withdraw">提现</navigator>
          </view>
        </view>
  
        <!-- 快捷操作 -->
        <view class="quick-actions">
          <navigator url="/pages/record/record" class="action-item">
            <image src="/static/index/img/bill.png" class="action-icon" />
            <text class="action-text">账单</text>
          </navigator>
          <navigator url="/pages/transfer/transfer" class="action-item">
            <image src="/static/index/img/transfer.png" class="action-icon" />
            <text class="action-text">转账</text>
          </navigator>
        </view>
  
        <!-- 账户功能 -->
        <view class="function-list">
          <navigator url="/pages/profile/profile" class="function-item">个人资料</navigator>
          <navigator url="/pages/authen/authen" class="function-item">实名认证</navigator>
          <navigator url="/pages/team/team" class="function-item">我的团队</navigator>
          <navigator url="/pages/help/help" class="function-item">帮助中心</navigator>
          <navigator url="/pages/logout/logout" class="function-item">退出登录</navigator>
        </view>
      </view>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/components/Layout.vue";
  
  export default {
    components: { Layout },
    data() {
      return {
        user: {
          nickname: "加载中...",
          level: 0,
          authenStatus: "未认证",
        },
        wallet: {
          balance: "0.00",
          withdrawable: "0.00",
        },
      };
    },
    computed: {
      avatarUrl() {
        return "/static/index/img/default_avatar.png"; // 这里替换为动态数据
      },
    },
    mounted() {
      this.fetchUserData();
    },
    methods: {
      fetchUserData() {
        uni.request({
          url: "/api/account",
          success: (res) => {
            this.user = res.data.user;
            this.wallet = res.data.wallet;
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/account.css";
  </style>
  