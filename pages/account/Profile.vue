<template>
    <Layout title="个人资料">
      <view class="profile-container">
        <view class="card">
          <view class="card-body">
            <form @submit.prevent="updateProfile">
              <view class="form-group">
                <label>昵称</label>
                <input v-model="user.nickname" class="form-control" />
              </view>
              <view class="form-group">
                <label>微信号</label>
                <input v-model="user.wechat" class="form-control" />
              </view>
              <view class="form-group">
                <label>QQ号码</label>
                <input v-model="user.qq" class="form-control" />
              </view>
              <view class="form-group">
                <label>支付宝</label>
                <input v-model="user.alipay" class="form-control" />
              </view>
              <view class="form-group">
                <label>银行名称</label>
                <input v-model="user.bankname" class="form-control" />
              </view>
              <view class="form-group">
                <label>银行卡号</label>
                <input v-model="user.bankcard" class="form-control" />
              </view>
              <button type="submit" class="btn">保存修改</button>
            </form>
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
        user: {
          nickname: "",
          wechat: "",
          qq: "",
          alipay: "",
          bankname: "",
          bankcard: "",
        },
      };
    },
    mounted() {
      this.fetchProfile();
    },
    methods: {
      fetchProfile() {
        uni.request({
          url: "/api/profile",
          success: (res) => {
            this.user = res.data.user;
          },
        });
      },
      updateProfile() {
        uni.request({
          url: "/api/profile/update",
          method: "POST",
          data: this.user,
          success: () => {
            uni.showToast({ title: "更新成功", icon: "success" });
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/account.css";
  </style>
  