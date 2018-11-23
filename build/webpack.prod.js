const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common            = require('./webpack.common.js');
const utils             = require('./utils')
const dir               = require('./path.config')


module.exports = merge(common,{
	mode  : 'production',
	module: {
		rules: [
			{
    		test: /\.scss$/,
    		use : ExtractTextPlugin.extract({
					// fallback: 'style-loader',
					use: ['css-loader', 'sass-loader', {
						loader : 'postcss-loader',
						options: {
							plugins: [
								require("autoprefixer")
							]
						}
					}],
					publicPath: '../' //解决css文件图片路径问题
				}),
    		include: utils.getPath(dir.RESOURCEDIR)
    	}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/main.[md5:contenthash:hex:8].css')
	],
	optimization: {
		//提取webpack的代码文件
		runtimeChunk: {
			name: 'js/runtime'
		},
		splitChunks: {
			cacheGroups: {
				common1: {
					chunks: 'all',
					minChunks: 2,
					minSize: 0,
					test: /common/,
					name: 'js/common'
				}
			}
		}
	},
	stats: {
		chunks     : false,
		children   : false,
		modules    : false,
		entrypoints: false
	},
	devtool: 'source-map'
})