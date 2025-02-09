<template>
    <Layout title="抽奖专区">
      <view class="lottery-container">
        <view class="lottery-grid">
          <navigator url="/pages/scratch/scratch" class="lottery-item">
            <image src="/static/index/img/guaguale.jpg" class="lottery-img" />
            <text class="lottery-title">刮刮乐</text>
          </navigator>
  
          <navigator url="/pages/turntable/turntable" class="lottery-item">
            <image src="/static/index/img/dazhuanpan.jpg" class="lottery-img" />
            <text class="lottery-title">幸运转盘</text>
          </navigator>
        </view>
      </view>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/components/Layout.vue";
  
  export default {
    components: { Layout },
  };
  </script>
  
  <style scoped>
  @import "//static/css/team.css";
  </style>
  