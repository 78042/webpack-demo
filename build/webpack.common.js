const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

function getPath(_path) {
  return path.join(__dirname, _path);
}

module.exports = {
	entry: {
  	app: getPath('../src/js/app.js')
	},
	output: {
  	path: getPath('../dist'),
  	filename: '[name].[hash:8].js',
  	publicPath: '/public'
	},
	module: {
  	rules: [
    	{
      	test: /\.js$/,
      	loader: 'babel-loader',
      	exclude: /node_modules/
    	}
  	]
	},
	plugins: [
		new htmlWebpackPlugin({
	    template: getPath('../src/index.html')
	  })
	]
}