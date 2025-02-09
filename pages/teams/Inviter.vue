<template>
    <Layout title="邀请好友">
      <view class="invite-container">
        <text class="invite-title">分享邀请码</text>
        <input v-model="inviteCode" class="form-control" readonly />
  
        <text class="invite-title">推广链接</text>
        <input v-model="inviteLink" class="form-control" readonly />
  
        <button @click="copyLink" class="btn">复制链接</button>
      </view>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/components/Layout.vue";
  
  export default {
    components: { Layout },
    data() {
      return {
        inviteCode: "123456",
        inviteLink: "https://example.com/signup?invite=123456",
      };
    },
    methods: {
      copyLink() {
        uni.setClipboardData({ data: this.inviteLink });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/team.css";
  </style>
  