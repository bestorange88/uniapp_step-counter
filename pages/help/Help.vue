<template>
    <Layout title="帮助文档">
      <view class="help-container">
        <view class="card">
          <view class="card-body">
            <view class="text-wrap" v-html="helpContent"></view>
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
        helpContent: "<p>加载中...</p>",
      };
    },
    mounted() {
      this.fetchHelpContent();
    },
    methods: {
      fetchHelpContent() {
        uni.request({
          url: "/api/help",
          success: (res) => {
            this.helpContent = res.data.content;
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .help-container {
    padding: 16px;
  }
  .card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
  }
  .text-wrap {
    font-size: 16px;
    color: #333;
  }
  </style>
  