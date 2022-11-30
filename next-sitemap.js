const urlRoot = 'https://www.classe.dev'

module.exports = {
  siteUrl: urlRoot,
  autoLastmod: new Date().toISOString(),
  generateRobotsTxt: true,
  exclude: ['/cookies', '/terminos-legales'],

  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: config.autoLastmod,
    }
  },
}
