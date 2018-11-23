const htmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils')
const dir   = require('./path.config')

const handleEntry = (arr) => {
	const enter = {};
	arr.forEach(item => {
		enter['js/'+item[0]] = item[1];
	});
	return enter;
}

//webpack 打包会自动剔除引入的没用模块
module.exports = {
	entry: handleEntry(
		[
			['app',utils.getPath(dir.JSDIR + 'app.js')],
			['user',utils.getPath(dir.JSDIR + 'user.js')]
		]
	),
	output: {
  	path    : utils.getPath(dir.OUTPUTDIR),
  	filename: '[name].[chunkhash:8].js',
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
		new htmlWebpackPlugin({
			template: utils.getPath(dir.RESOURCEDIR + '/index.html'),
			filename: 'index.html',
			title   : 'index',
			chunks  : [
				`js/runtime`,
				`js/app`,
				`js/common`,
			]
	  }),
		new htmlWebpackPlugin({
			template: utils.getPath(dir.RESOURCEDIR + '/user.html'),
			filename: 'user.html',
			title   : 'user',
			chunks  : [
				`js/runtime`,
				`js/user`,
				`js/common`,
			]
	  })
	],
	externals: {
		jquery: 'jQuery'
	}
}