var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/content/js/MonkController.js',
	output: {
		filename: 'bundle.js'
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/index.html' }
		]),
		new CopyWebpackPlugin([
			{ from: './src/content', to: 'content' }
		])
	],

	resolve: {
		extensions: ['.js', '.jsx']
	},

	devServer: {
		inline: true,
		contentBase: './dist',
		port: 8081
	}
};
