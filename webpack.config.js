var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'www/js');
var APP_DIR = path.resolve(__dirname, 'scripts');

var config = {
	entry: APP_DIR + '/app.js',
	output: {
		path: BUILD_DIR,
		filename: 'webpack.bundle.js'
	}
};

module.exports = config;