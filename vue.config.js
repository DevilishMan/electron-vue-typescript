const path = require('path');
module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  assetsDir: '',
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  pages: {
    index: {
      entry: 'src/renderer/main',
      template: 'public/index.html',
    },
    login: {
      entry: 'src/renderer/login',
      template: 'public/login.html',
    },
  },
  pluginOptions: {
    electronBuilder: {
      outputDir: 'dist',
      removeElectronJunk: true,
      mainProcessFile: 'src/main/main',
      mainProcessWatch: ['src/main/**/*'],
    },
    // import valiable.less global
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/renderer/assets/css/valiable.less')],
    },
  },
};
