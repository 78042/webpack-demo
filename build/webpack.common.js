const htmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const utils = require('./utils')
const dir   = require('./path.config')


const setHTML = function (fileName,title,chunks) {
	return {
			title: title,//使用html-loader后无效
			template: utils.getPath(`${dir.RESOURCEDIR}/${fileName}.html`),
			filename: `${fileName}.html`,
			hash: false,//js,css加?hash
			chunks: chunks,
			chunksSortMode: function (chunk1, chunk2) {
					var order1 = chunks.indexOf(chunk1.names[0]);
					var order2 = chunks.indexOf(chunk2.names[0]);
					return order1 - order2;  
			}
	}
}

//webpack 打包会自动剔除引入的没用模块
module.exports = {
	entry: {
		'app': utils.getPath(dir.JSDIR + 'app.js'),
		'user': utils.getPath(dir.JSDIR + 'user.js')
	},
	output: {
  	path    : utils.getPath(dir.OUTPUTDIR),
  	filename: 'js/[name].[chunkhash:8].js',
  	// publicPath: '/public' //一般cdn使用
	},
	module: {
  	rules: [
    	{
      	test   : /\.js$/,
      	loader : 'babel-loader',
      	exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|webp)/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: 'img/[name]-[hash:7].[ext]',
							// publicPath: 'http://xxx', //统一html/css中图片路径
							limit: 3072
						}
					}
				]
			},
			{
        test: /\.html$/,
        loader: 'html-withimg-loader'
   		}
  	]
	},
	plugins: [
		new htmlWebpackPlugin(
			setHTML('index','title',[
				'vendor',
				`commonjs`,
				`app`,
				// 'vendor',
			])
		),
		new htmlWebpackPlugin(
			setHTML('user','title',[
				'vendor',
				`commonjs`,
				`user`,
				// 'js/vendor',
			])
		),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
			chunkFilename: "css/[id].css"
		})
		//与CopyWebpackPlugin结合使用，生产环境可用，开发环境下不适用
		// new HtmlWebpackIncludeAssetsPlugin({
		// 	assets: ['vendor/css/a.css'],
		// 	publicPath: './',
		// 	append: false
		// })
	],
	// externals: {
	// 	$: 'jQuery'
	// }
}