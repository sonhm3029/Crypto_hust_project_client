const path = require("path");

module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@videos": path.resolve(__dirname, "src/assets/videos"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@data-access": path.resolve(__dirname, "src/data-access"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@views": path.resolve(__dirname, "src/views"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@layouts": path.resolve(__dirname, "src/views/layouts"),
      "@routes": path.resolve(__dirname, "src/routes"),
    },
  };

  return config;
};
