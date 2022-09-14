const withImages = require('next-images')
const withTM = require('next-transpile-modules')(['gsap'])

module.exports = withTM(
  withImages({
    images: { disableStaticImages: true },
    i18n: {
      locales: ['es'],
      defaultLocale: 'es',
    },
    pageExtensions: ['page.jsx', 'page.js'],
  }),
)
