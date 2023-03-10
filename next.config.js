module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    i18n: {
      locales: ['es'],
      defaultLocale: 'es',
    },
    pageExtensions: ['page.jsx', 'page.js'],
  }
  return nextConfig
}
