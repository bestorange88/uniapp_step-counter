<template>
  <view>
    <text>欢迎使用 UniApp！</text>
  </view>
</template>

<script>
import { Health } from "@/common/health.js";

export default {
  onLaunch() {
    console.log("App 启动");

    // 启动计步器
    if (Health.isSupported()) {
      Health.startCounting();
    }
  }
};
</script>

<style>
/* 全局样式 */
view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
}
</style>
