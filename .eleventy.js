const pluginCss = require('eleventy-postcss-extension')
const Image = require('@11ty/eleventy-img')
const moment = require('moment')

module.exports = function (config) {
  config.addPlugin(pluginCss)

  config.addFilter('date', function (date, format) {
    return moment(date).format(format)
  })

  config.addShortcode('currentYear', function () {
    return moment().utc().format('YYYY')
  })

  config.addNunjucksAsyncShortcode('social', async (url, img) => {
    const metadata = await Image(`src/assets/logos/${img}.svg`, {
      formats: ['svg'],
      svgShortCircuit: true,
      dryRun: true,
    })
    const svg = metadata.svg[0].buffer.toString()

    return `<a
      class="transition h-6 w-6 hover:fill-teal-500 dark:hover:fill-teal-300 fill-zinc-500 dark:fill-zinc-400"
      href="${url}" target="_blank">${svg}</a>`
  })

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    dir: {
      input: 'src',
    },
  }
}
