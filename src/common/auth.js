import request from "./api.js";

export const auth = {
  isLoggedIn: () => !!uni.getStorageSync("token"),
  login: (token) => uni.setStorageSync("token", token),
  logout: () => {
    uni.removeStorageSync("token");
    uni.reLaunch({ url: "/pages/login/login" });
  },
  getUserInfo: async () => {
    try {
      return await request("/account/info", "GET");
    } catch (err) {
      auth.logout();
    }
  },
};
