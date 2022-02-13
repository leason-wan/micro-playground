const { name } = require('./package.json');
const ip = require('ip');
const PORT = 8001;

module.exports = {
  // publicPath: `//${ip.address()}:${PORT}/`,
  devServer: {
    port: PORT,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  }
}