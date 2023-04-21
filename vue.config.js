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
});
