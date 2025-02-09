<template>
    <Layout title="我的团队">
      <view class="my-team-container">
        <text class="team-title">我的团队</text>
  
        <view v-if="team">
          <text>团队名称：{{ team.name }}</text>
          <text>成员数：{{ team.memberCount }}</text>
  
          <view class="team-members">
            <view v-for="(member, index) in team.members" :key="index" class="member-item">
              <image :src="member.avatar" class="avatar" />
              <text>{{ member.name }}</text>
            </view>
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
        team: null,
      };
    },
    mounted() {
      this.fetchMyTeam();
    },
    methods: {
      fetchMyTeam() {
        uni.request({
          url: "/api/team/my_team",
          success: (res) => {
            this.team = res.data.team;
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/team.css";
  </style>
  