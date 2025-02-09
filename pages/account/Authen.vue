<template>
    <Layout title="实名认证">
      <view class="authen-container">
        <text class="authen-title">实名认证</text>
        <view class="authen-alert authen-alert-info">
          当前认证状态: <text>{{ authenStatus }}</text>
        </view>
  
        <form @submit.prevent="submitAuthen">
          <view class="authen-form-group">
            <label class="authen-form-label">真实姓名</label>
            <input v-model="authenData.name" class="authen-form-control" placeholder="请输入真实姓名" required />
          </view>
  
          <view class="authen-form-group">
            <label class="authen-form-label">身份证号码</label>
            <input v-model="authenData.idCard" class="authen-form-control" placeholder="请输入身份证号码" required />
          </view>
  
          <view class="authen-form-group">
            <label class="authen-form-label">身份证正面</label>
            <button @click="chooseImage('front')" class="authen-btn">上传</button>
            <image v-if="authenData.frontImage" :src="authenData.frontImage" class="authen-image-preview" />
          </view>
  
          <view class="authen-form-group">
            <label class="authen-form-label">身份证反面</label>
            <button @click="chooseImage('back')" class="authen-btn">上传</button>
            <image v-if="authenData.backImage" :src="authenData.backImage" class="authen-image-preview" />
          </view>
  
          <button type="submit" class="authen-btn">提交认证</button>
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
        authenStatus: "未实名",
        authenData: {
          name: "",
          idCard: "",
          frontImage: "",
          backImage: "",
        },
      };
    },
    methods: {
      chooseImage(side) {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            this.authenData[side + "Image"] = res.tempFilePaths[0];
          },
        });
      },
      submitAuthen() {
        uni.showToast({ title: "认证提交成功", icon: "success" });
      },
    },
  };
  </script>
  
  <style scoped>
  @import "//static/css/account.css";
  </style>
  