<template>
    <Layout title="内部转账">
      <view class="transfer-container">
        <!-- 提交转账 -->
        <view class="card card-form">
          <view class="card-header">
            <text class="card-title">提交转账</text>
          </view>
          <view class="card-body">
            <view class="form-group">
              <label class="form-label">对方账号</label>
              <input v-model="transferData.target" class="form-control" placeholder="输入对方账号" />
            </view>
  
            <view class="form-group">
              <label class="form-label">金额</label>
              <input v-model="transferData.amount" class="form-control" type="number" placeholder="0.00" />
            </view>
  
            <view class="form-group">
              <label class="form-label">安全密码</label>
              <input v-model="transferData.password" class="form-control" type="password" placeholder="******" />
            </view>
  
            <button class="btn btn-primary" @click="submitTransfer">立即转账</button>
          </view>
        </view>
  
        <!-- 历史记录 -->
        <view class="card">
          <view class="card-header">
            <text class="card-title">历史记录</text>
          </view>
          <view class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>用户</th>
                  <th class="text-right">数量</th>
                  <th class="text-right">服务费</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in history" :key="record.id">
                  <td>{{ record.user }}</td>
                  <td class="text-right">{{ record.amount }}</td>
                  <td class="text-right">{{ record.fee }}</td>
                </tr>
              </tbody>
            </table>
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
        transferData: {
          target: "",
          amount: "",
          password: "",
        },
        history: [],
      };
    },
    mounted() {
      this.fetchTransferHistory();
    },
    methods: {
      fetchTransferHistory() {
        uni.request({
          url: "/api/transfer/history",
          success: (res) => {
            this.history = res.data.history;
          },
        });
      },
      submitTransfer() {
        if (!this.transferData.target || !this.transferData.amount || !this.transferData.password) {
          uni.showToast({ title: "请填写完整信息", icon: "none" });
          return;
        }
  
        uni.request({
          url: "/api/transfer",
          method: "POST",
          data: this.transferData,
          success: (res) => {
            if (res.data.code === 200) {
              uni.showToast({ title: "转账成功", icon: "success" });
              this.fetchTransferHistory();
            } else {
              uni.showToast({ title: res.data.message, icon: "none" });
            }
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .transfer-container {
    padding: 16px;
  }
  .card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin-bottom: 16px;
  }
  .card-header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .card-title {
    font-size: 16px;
    font-weight: bold;
  }
  .form-group {
    margin-bottom: 12px;
  }
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 6px;
  }
  .form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  .btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 16px;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  .table th,
  .table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  .text-right {
    text-align: right;
  }
  </style>
  