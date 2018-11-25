const os                   = require('os');
const webpack              = require('webpack');
const merge                = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const common               = require('./webpack.common');
const utils                = require('./utils')
const dir                  = require('./path.config')


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
	mode  : 'development',
	output: {
		filename: '[name].[hash:8].js',
	},
	module: {
		rules: [
			{
    		// test   : /\.scss$/,
    		test: /\.(scss|css)$/,
        use: [
					'css-hot-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../' //解决img路劲问题
						}
					},
					'css-loader',
					"sass-loader"
				],
    	}
		]
	},
	plugins: [
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`The application is running here: http://${devServerConfig.host}:${devServerConfig.port}`],
      }
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
		// new webpack.NamedModulesPlugin(),
		// new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		host       : devServerConfig.host,
		port       : devServerConfig.port,
		contentBase: utils.getPath(dir.OUTPUTDIR),
		// publicPath: '/public',
		// historyApiFallback: {
		//   index: '/public/index.html'
		// },
		open          : true,
		overlay       : true,
		quiet         : true,   //for FriendlyErrorsPlugin
		//hot           : true,   //在js里if(module.hot){module.hot.accept()}
		clientLogLevel: 'none'  //
	},
	devtool: 'cheap-module-eval-source-map'
})