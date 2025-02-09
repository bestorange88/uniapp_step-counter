<template>
    <Layout title="提现记录">
      <view class="withdrawal-record-container">
        <view class="record-list">
          <view v-for="(record, index) in records" :key="index" class="record-item">
            <text>{{ record.amount }} 元</text>
            <text class="record-status">{{ record.status }}</text>
            <text class="record-date">{{ record.date }}</text>
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
        records: [
          { amount: "100", status: "待处理", date: "2024-01-01" },
          { amount: "50", status: "成功", date: "2024-01-02" },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/account.css";
  </style>
  