const { defineConfig } = require("@vue/cli-service");
const UnoCSS = require("@unocss/webpack").default;
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [UnoCSS({})],
    optimization: {
      realContentHash: true,
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://api.openai.com", // 修改为实际的后端接口地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
});
