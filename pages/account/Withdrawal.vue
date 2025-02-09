<template>
    <Layout title="提现">
      <view class="withdrawal-container">
        <form @submit.prevent="submitWithdrawal">
          <view class="form-group">
            <label>提现金额</label>
            <input v-model="withdrawAmount" type="number" class="form-control" required />
          </view>
  
          <view class="form-group">
            <label>银行卡号</label>
            <input v-model="bankCard" class="form-control" required />
          </view>
  
          <button type="submit" class="btn-primary">提交提现</button>
        </form>
      </view>
    </Layout>
  </template>
  
  <script>
  import Layout from "@/components/Layout.vue";
  
  export default {
    components: { Layout },
    data() {
      return {
        withdrawAmount: "",
        bankCard: "",
      };
    },
    methods: {
      submitWithdrawal() {
        uni.showToast({ title: "提现申请成功", icon: "success" });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/account.css";
  </style>
  