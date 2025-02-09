<template>
    <Layout title="寻找团队">
      <view class="search-team-container">
        <form @submit.prevent="searchTeam">
          <view class="form-group">
            <label>搜索团队</label>
            <input v-model="searchKey" class="form-control" placeholder="输入团队名称或关键字" required />
          </view>
          <button type="submit" class="btn">搜索</button>
        </form>
  
        <view v-if="teams.length > 0" class="search-results">
          <view v-for="(team, index) in teams" :key="index" class="team-item">
            <text>{{ team.name }}</text>
            <button class="btn" @click="joinTeam(team.id)">加入</button>
          </view>
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
        searchKey: "",
        teams: [],
      };
    },
    methods: {
      searchTeam() {
        uni.request({
          url: "/api/team/search",
          data: { query: this.searchKey },
          success: (res) => {
            this.teams = res.data.teams;
          },
        });
      },
      joinTeam(teamId) {
        uni.showToast({ title: "申请已提交", icon: "success" });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/team.css";
  </style>
  