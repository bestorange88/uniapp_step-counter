<template>
    <Layout title="交易记录">
      <view class="record-container">
        <view class="filter">
          <picker @change="filterType" :range="transactionTypes">
            <view class="picker">当前筛选：{{ selectedType }}</view>
          </picker>
        </view>
  
        <view class="transaction-list">
          <view v-for="(item, index) in records" :key="index" class="transaction-item">
            <text>{{ item.type }} | {{ item.amount }} 元</text>
            <text class="transaction-date">{{ item.date }}</text>
          </view>
        </view>
  
        <button class="load-more" @click="loadMore">加载更多</button>
      </view>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/components/Layout.vue";
  
  export default {
    components: { Layout },
    data() {
      return {
        selectedType: "全部类型",
        transactionTypes: ["全部类型", "充值", "提现", "奖励", "消费"],
        records: [],
      };
    },
    mounted() {
      this.loadRecords();
    },
    methods: {
      filterType(e) {
        this.selectedType = this.transactionTypes[e.detail.value];
        this.loadRecords();
      },
      loadRecords() {
        uni.showToast({ title: "加载中...", icon: "loading" });
        this.records = [
          { type: "充值", amount: "100", date: "2024-01-01" },
          { type: "提现", amount: "50", date: "2024-01-02" },
        ];
      },
      loadMore() {
        uni.showToast({ title: "加载更多...", icon: "loading" });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/account.css";
  </style>
  