const pluginCss = require("eleventy-postcss-extension");

module.exports = function (config) {
  config.addPlugin(pluginCss);
  config.addFilter("date", function (date, format) {
    const moment = require("moment");
    return moment(date).format(format);
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    dir: {
      input: "src",
    },
  };
};
