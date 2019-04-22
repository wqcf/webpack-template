const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// STEP1:添加页面
var templateOne = new HtmlWebPackPlugin({
	template: "./src/pages/template/template.html",
	filename: "./pages/template.html",
	chunks: ["template"],
    chunksSortMode: 'manual'
});

//copy
var CopyWebpackPlugin = require('copy-webpack-plugin');
var copyStatic = new CopyWebpackPlugin([
	// { from: 'assets/', to: 'assets/' },
	{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
	{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
	{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
]);

module.exports = (env, argv) => {
	const devMode = argv.mode !== 'production'
	return {
		devServer: {
			host: "localhost",
			port: 8000,
			proxy: {
				'/qd': {
					target: 'http://192.168.1.23:8080/',
					secure: false
				},
			}
		},
		entry: {
			// STEP2:添加JS
			template: './src/pages/template/template.js',
			bundle: './src/js/bundle.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].js',
			publicPath: '/',
			sourcePrefix: ''
		},
		amd: {
			// Enable webpack-friendly use of require in Cesium
			toUrlUndefined: true
		},
		node: {
			// Resolve node module use of fs
			fs: 'empty'
		},
		module: {
			unknownContextCritical: false,
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				},
				{
					test: /\.scss$/,
					use: [
						"style-loader", "css-loader", "sass-loader"
					]
				},
				{
					test: /\.css$/,
					use: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader'
					]
				},
				{
					test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
					use: ['url-loader']
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "[name].css",
				chunkFilename: "[id].css"
			}),
			new CleanWebpackPlugin(),
			copyStatic,
			new webpack.DefinePlugin({
				// Define relative base path in cesium for loading assets
				CESIUM_BASE_URL: JSON.stringify('/')
			}),
			// STEP3:添加
			templateOne,
		],
		resolve: {
			alias: {
				// CesiumJS module name
				cesium: path.resolve(__dirname, cesiumSource)
			}
		}
	}
}