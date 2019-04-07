// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "gympool" : "/",

  pluginOptions: {
    i18n: {
      locale: "zh-tw",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
