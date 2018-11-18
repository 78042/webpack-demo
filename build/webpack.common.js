const htmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils')
const dir   = require('./path.config')

const handleEntry = (arr) => {
	const enter = {};
	arr.forEach(item => {
		enter[dir.JSDIR+item[0]] = item[1];
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
    	}
  	]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: utils.getPath(dir.RESOURCEDIR + '/index.html'),
			filename: 'index.html',
			title   : 'index',
			chunks  : [
				`${dir.JSDIR}runtime`,
				`${dir.JSDIR}app`,
				`${dir.JSDIR}common`,
			]
	  }),
		new htmlWebpackPlugin({
			template: utils.getPath(dir.RESOURCEDIR + '/user.html'),
			filename: 'user.html',
			title   : 'user',
			chunks  : [
				`${dir.JSDIR}runtime`,
				`${dir.JSDIR}user`,
				`${dir.JSDIR}common`,
			]
	  })
	]
}