const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src") // 确保 `@` 指向 `src`
      }
    }
  }
};
