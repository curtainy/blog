module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'routes': '@/routes',
        'views': 'views'
      }
    }
  }
}