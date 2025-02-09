<template>
    <view>
      <!-- 头部 -->
      <Header :title="title" />
  
      <!-- 页面主内容 -->
      <view class="main-content">
        <slot></slot>
      </view>
  
      <!-- 底部 -->
      <Footer />
    </view>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  
  export default {
    components: {
      Header,
      Footer,
    },
    props: {
      title: {
        type: String,
        default: "绿步盈途",
      },
    },
  };
  </script>
  
  <style scoped>
  .main-content {
    margin-top: 64px;
    padding: 16px;
  }
  </style>
  