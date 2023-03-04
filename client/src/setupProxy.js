const { createProxyMiddleware } = require("http-proxy-middleware");
const config = require("./configs/config");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: config.serverUrl
    })
  );
};