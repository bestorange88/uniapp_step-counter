import * as StepCounter from "@/uni_modules/wuwx-step-counter";

 // 使用绝对路径，确保解析成功

export const Health = {
  /**
   * 检查是否支持计步器功能
   * 支持平台：iOS、Android
   */
  isSupported: function () {
    const platform = uni.getSystemInfoSync().platform;
    return platform === "ios" || platform === "android";
  },

  /**
   * 启动计步器
   */
  startCounting: function () {
    if (!this.isSupported()) {
      uni.showToast({ title: "当前设备不支持计步功能", icon: "none" });
      return;
    }

    StepCounter.startStepCountingUpdates({
      handler: (numberOfSteps, timestamp, error) => {
        if (error) {
          console.error("计步器错误：", error);
          return;
        }

        console.log("当前步数：", numberOfSteps);
        uni.setStorageSync("today_steps", numberOfSteps);

        // 每 100 步上传一次
        if (numberOfSteps % 100 === 0) {
          this.uploadStepCount(numberOfSteps);
        }
      }
    });

    uni.showToast({ title: "计步器已启动", icon: "success" });
  },

  /**
   * 停止计步器
   */
  stopCounting: function () {
    StepCounter.stopStepCountingUpdates();
    uni.showToast({ title: "计步器已停止", icon: "success" });
  },

  /**
   * 上传步数数据到服务器
   * @param {number} steps 步数
   */
  uploadStepCount: function (steps) {
    uni.request({
      url: "https://lvbuyingtu.com/api/health/upload_steps", // 替换为你的接口地址
      method: "POST",
      header: { Authorization: uni.getStorageSync("token") }, // 添加 Token 验证
      data: { steps: steps },
      success: (res) => {
        if (res.data.code === 200) {
          console.log("步数上传成功");
        } else {
          console.error("步数上传失败：", res.data.message);
        }
      },
      fail: () => {
        console.error("网络错误，步数未上传");
      }
    });
  }
};
