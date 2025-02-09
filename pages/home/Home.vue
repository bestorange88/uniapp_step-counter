<template>
    <Layout title="首页">
      <view class="home-container">
        <!-- 日期与天气 -->
        <view class="date-weather">
          <text class="date">{{ currentDate }}</text>
          <text class="weather">{{ weather }}</text>
        </view>
  
        <!-- 步数统计圆环 -->
        <view class="relative w-48 h-48 mx-auto">
          <view class="absolute inset-0 flex items-center justify-center">
            <text class="text-3xl font-medium text-custom">{{ stepCount }}步</text>
          </view>
          <svg class="w-full h-full">
            <circle cx="96" cy="96" r="90" stroke="#E9ECEF" stroke-width="12" fill="none"></circle>
            <circle id="progress-circle" cx="96" cy="96" r="90" stroke="#00A896" stroke-width="12" fill="none"
              stroke-dasharray="565.2" :stroke-dashoffset="progressOffset"></circle>
          </svg>
        </view>
  
        <!-- 数据统计 -->
        <view class="grid grid-cols-3 gap-4 text-center">
          <view>
            <text class="text-[#008C8C]">减少碳排放</text>
            <text class="text-custom font-medium">{{ carbonEmissions }}kg</text>
          </view>
          <view>
            <text class="text-[#008C8C]">消耗卡路里</text>
            <text class="text-custom font-medium">{{ caloriesBurned }}千卡</text>
          </view>
          <view>
            <text class="text-[#008C8C]">环保贡献</text>
            <text class="text-custom font-medium">{{ environmentalContribution }}</text>
          </view>
        </view>
  
        <!-- 今日步数 & 步行距离 -->
        <view class="grid grid-cols-2 gap-4">
          <view class="shadow-md rounded-lg p-4">
            <text class="text-[#008C8C] font-bold">今日步数</text>
            <text class="text-2xl font-bold text-[#008C8C]">{{ stepCount }} 步</text>
          </view>
          <view class="shadow-md rounded-lg p-4">
            <text class="text-[#008C8C] font-bold">步行距离</text>
            <text class="text-2xl font-bold text-[#008C8C]">{{ walkingDistance }} 公里</text>
          </view>
        </view>
  
        <!-- 奖励领取 -->
        <view class="bg-white rounded-lg shadow-md p-4">
          <text class="text-2xl font-bold text-[#008C8C] mb-4">每日限领一次</text>
          <view class="space-y-3">
            <view v-for="(reward, index) in rewards" :key="index" class="flex justify-between items-center p-3 bg-[#CCEDED] rounded-lg shadow-sm">
              <text class="text-lg font-bold text-[#008C8C]">{{ reward.title }} ({{ reward.steps }}步)</text>
              <button class="reward-button bg-[#008C8C] text-white px-5 py-2 rounded-full"
                :disabled="reward.claimed" @click="claimReward(reward)">
                {{ reward.claimed ? `已领取 ${reward.amount} 元` : `领取 ${reward.amount} 元` }}
              </button>
            </view>
          </view>
        </view>
  
        <!-- 健康资讯 -->
        <view class="mt-4 bg-white rounded-lg p-4 shadow-md">
          <text class="text-2xl font-bold text-[#008C8C] mb-4">健康资讯</text>
          <view v-for="(article, index) in articles" :key="index" class="flex items-center space-x-4 py-4">
            <image :src="article.thumbnail" class="w-16 h-16 rounded-lg object-cover" />
            <text class="text-gray-800 font-bold text-lg">{{ article.title }}</text>
          </view>
        </view>
      </view>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/components/Layout.vue";
  
  export default {
    components: {
      Layout,
    },
    data() {
      return {
        currentDate: "2024年12月20日",
        weather: "未知天气",
        stepCount: 0,
        walkingDistance: "0",
        caloriesBurned: "0",
        carbonEmissions: "0",
        environmentalContribution: "0%",
        rewards: [
          { title: "绿色小将", steps: 2000, amount: 1, claimed: false },
          { title: "运动先锋", steps: 5000, amount: 2, claimed: false },
          { title: "环保达人", steps: 8000, amount: 3, claimed: false },
        ],
        articles: [],
      };
    },
    computed: {
      progressOffset() {
        const maxSteps = 8000;
        return 565.2 - (this.stepCount / maxSteps) * 565.2;
      },
    },
    methods: {
      fetchData() {
        this.stepCount = this.getStepsFromLocalStorage() || 0;
        this.updateStatistics();
        this.fetchArticles();
      },
      updateStatistics() {
        const stepsToKm = 0.0007;
        this.walkingDistance = (this.stepCount * stepsToKm).toFixed(2);
  
        const caloriesPerKmPerKg = 0.8214;
        const userWeight = 70;
        const distanceKm = this.stepCount * 0.75 / 1000;
        this.caloriesBurned = (distanceKm * caloriesPerKmPerKg * userWeight).toFixed(2);
  
        const carbonEmissionsPerKm = 0.15;
        this.carbonEmissions = (distanceKm * carbonEmissionsPerKm).toFixed(2);
  
        this.environmentalContribution = (this.carbonEmissions * 10).toFixed(2) + "%";
      },
      fetchArticles() {
        uni.request({
          url: "/api/articles",
          success: (res) => {
            this.articles = res.data.articles || [];
          },
        });
      },
      claimReward(reward) {
        if (this.stepCount < reward.steps) {
          uni.showToast({ title: "步数不足", icon: "none" });
          return;
        }
        reward.claimed = true;
        uni.showToast({ title: `成功领取 ${reward.amount} 元`, icon: "success" });
      },
      getStepsFromLocalStorage() {
        return parseInt(uni.getStorageSync("stepCount") || "0", 10);
      },
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/home.css";
  </style>
  