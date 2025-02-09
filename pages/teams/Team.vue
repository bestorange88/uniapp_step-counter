<template>
    <Layout title="团队">
      <view class="team-container">
        <!-- 团队排行榜 -->
        <view class="ranking-container">
          <text class="ranking-title">团队排行榜</text>
          <view v-for="(team, index) in rankings" :key="index" class="ranking-item">
            <image :src="team.avatar" class="avatar" />
            <text class="ranking-name">{{ team.username }}</text>
            <text class="ranking-score">今日步数：{{ team.todaySteps }}步</text>
          </view>
        </view>
  
        <!-- 团队信息 -->
        <view class="team-stats">
          <view class="team-card">
            <text class="team-title">团队人数</text>
            <text class="team-number">{{ teamInfo.teamCount }} 位</text>
          </view>
          <view class="team-card">
            <text class="team-title">团队积分</text>
            <text class="team-number">{{ teamInfo.teamPower }} 分</text>
          </view>
        </view>
  
        <!-- 团队操作 -->
        <view class="action-buttons">
          <navigator url="/pages/team/my_team" class="btn">我的团队</navigator>
          <navigator url="/pages/team/create_team" class="btn">创建团队</navigator>
          <navigator url="/pages/team/search_team" class="btn">寻找团队</navigator>
          <navigator url="/pages/team/inviter" class="btn">邀请好友</navigator>
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
        rankings: [],
        teamInfo: {
          teamCount: 0,
          teamPower: 0,
        },
      };
    },
    mounted() {
      this.fetchTeamData();
    },
    methods: {
      fetchTeamData() {
        uni.request({
          url: "/api/team",
          success: (res) => {
            this.rankings = res.data.rankings;
            this.teamInfo = res.data.teamInfo;
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/team.css";
  </style>
  