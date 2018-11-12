const path = require('path');
const os = require('os');
const webpack = require('webpack');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const common = require('./webpack.common.js');

function getPath(_path) {
  return path.join(__dirname, _path);
}
const getIP = () => {
  const _desc = os.networkInterfaces();
  for (let k in _desc) {
    let _ipv4 = _desc[k].find(item => item.family === 'IPv4');
    if (_ipv4) {
      return _ipv4.address;
    }
  }
  return '0.0.0.0'
}
const devServerConfig = {
  host: getIP(),
  port: 9000,
}

module.exports = merge(common,{
	mode: 'development',
	module: {
		rules: [
			{
    		test: /\.scss$/,
    		use: ['style-loader','css-loader','sass-loader',{
					loader: 'postcss-loader',
					options: {
						plugins: [
							require("autoprefixer")
						]
					}
			}],
    		include: getPath('../src')
    	}
		]
	},
	plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${devServerConfig.host}:${devServerConfig.port}`],
      }
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		host: devServerConfig.host,
		port: devServerConfig.port,
		contentBase: getPath('../dist'),
		publicPath: '/public',
		historyApiFallback: {
		  index: '/public/index.html'
		},
		open: true,
		overlay: true,
		quiet: true,//for FriendlyErrorsPlugin
		hot: true,//在js里if(module.hot){module.hot.accept()}
		clientLogLevel: 'none'//
	},
	devtool: 'cheap-module-eval-source-map'
})