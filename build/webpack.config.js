const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return devConfig;
  }
  if (argv.mode === 'production') {
    return devConfig;
  }
}
