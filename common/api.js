const BASE_URL = "https://lvbuyingtu.com/api"; // 修改为你的 ThinkPHP6 服务器地址

const request = (url, method, data = {}, auth = true) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${url}`,
      method: method,
      data: data,
      header: {
        "Content-Type": "application/json",
        ...(auth ? { Authorization: uni.getStorageSync("token") } : {}),
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data.code === 200) {
          resolve(res.data);
        } else {
          uni.showToast({ title: res.data.message || "请求失败", icon: "none" });
          reject(res.data);
        }
      },
      fail: (err) => {
        uni.showToast({ title: "网络错误", icon: "none" });
        reject(err);
      },
    });
  });
};

// 用户相关 API
export const userAPI = {
  getInfo: () => request("/account/info", "GET"),
  updateInfo: (data) => request("/account/update", "POST", data),
};

// 钱包相关 API
export const walletAPI = {
  getBalance: () => request("/wallet/balance", "GET"),
  withdraw: (amount) => request("/wallet/withdraw", "POST", { amount }),
};

// 团队 API
export const teamAPI = {
  getTeamInfo: () => request("/team", "GET"),
};

// 其他 API ...
export default request;
