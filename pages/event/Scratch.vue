<template>
    <Layout title="刮刮乐">
      <view class="scratch-container">
        <view class="scratch">
          <view class="scratch-count">剩余抽奖次数：{{ remainingChances }}</view>
          <canvas id="scratchCanvas"></canvas>
        </view>
  
        <view v-if="reward" class="reward-container">
          <text class="reward-text">恭喜你获得 {{ reward }}</text>
        </view>
  
        <button class="btn" @click="resetScratch">再试一次</button>
      </view>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/components/Layout.vue";
  
  export default {
    components: { Layout },
    data() {
      return {
        remainingChances: 5,
        reward: null,
      };
    },
    methods: {
      resetScratch() {
        if (this.remainingChances > 0) {
          this.remainingChances--;
          this.reward = this.getRandomReward();
        } else {
          uni.showToast({ title: "没有抽奖次数了", icon: "none" });
        }
      },
      getRandomReward() {
        const rewards = ["红包5元", "现金10元", "谢谢惠顾"];
        return rewards[Math.floor(Math.random() * rewards.length)];
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/team.css";
  </style>
  