const withImages = require('next-images')
const withTM = require('next-transpile-modules')(['gsap'])

module.exports = withTM(
  withImages({
    i18n: {
      locales: ['es'],
      defaultLocale: 'es',
    },
    future: {
      webpack5: true,
    },
    pageExtensions: ['page.jsx', 'page.js'],
  }),
)
