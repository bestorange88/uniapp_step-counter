<template>
    <Layout title="创建团队">
      <view class="create-team-container">
        <form @submit.prevent="createTeam">
          <view class="form-group">
            <label>团队名称</label>
            <input v-model="teamName" class="form-control" required />
          </view>
          <view class="form-group">
            <label>团队描述</label>
            <textarea v-model="teamDescription" class="form-control" required></textarea>
          </view>
          <button type="submit" class="btn">创建团队</button>
        </form>
      </view>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/components/Layout.vue";
  
  export default {
    components: { Layout },
    data() {
      return {
        teamName: "",
        teamDescription: "",
      };
    },
    methods: {
      createTeam() {
        uni.showToast({ title: "团队创建成功", icon: "success" });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/team.css";
  </style>
  