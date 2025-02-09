<template>
    <Layout title="幸运转盘">
      <view class="turntable-container">
        <view class="chance-count">剩余抽奖次数：{{ remainingChances }}</view>
  
        <image class="turntable-img" src="/static/image/turnplate-bg.png"></image>
        <button class="btn" @click="startSpin">点击抽奖</button>
  
        <view v-if="reward" class="reward-text">恭喜获得：{{ reward }}</view>
      </view>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/components/Layout.vue";
  
  export default {
    components: { Layout },
    data() {
      return {
        remainingChances: 3,
        reward: null,
      };
    },
    methods: {
      startSpin() {
        if (this.remainingChances > 0) {
          this.remainingChances--;
          this.reward = this.getRandomReward();
        } else {
          uni.showToast({ title: "没有抽奖次数", icon: "none" });
        }
      },
      getRandomReward() {
        const rewards = ["现金20元", "优惠券", "谢谢惠顾"];
        return rewards[Math.floor(Math.random() * rewards.length)];
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/team.css";
  </style>
  