/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies

const {
	override,
	overrideDevServer,
	addWebpackAlias,
	addBabelPreset,
	useBabelRc,
} = require("customize-cra");

const CompressionWebpackPlugin = require("compression-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const DeadCodePlugin = require("webpack-deadcode-plugin");

const zlib = require("zlib");
const webpack = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");

const customizePlugin = [
	new CompressionWebpackPlugin({
		filename: "[path].br",
		algorithm: "brotliCompress",
		test: /\.(js|css|html|svg|txt|eot|otf|ttf|gif)$/,
		compressionOptions: {
			params: {
				[zlib.constants.BROTLI_PARAM_QUALITY]: 11,
			},
		},
		threshold: 10240,
		minRatio: 0.5,
		deleteOriginalAssets: false,
	}),

	new webpack.DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify("production"),
	}),
	// new webpack.optimize.AggressiveMergingPlugin(),
	new CleanWebpackPlugin(),
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	new DeadCodePlugin({
		patterns: ["src/**/*.(js|jsx|css)"],
		exclude: ["**/*.(stories|spec).(js|jsx)"],
	}),
	new HtmlCriticalWebpackPlugin({
		base: path.resolve(__dirname, "build"),
		src: "index.html",
		dest: "index.html",
		inline: true,
		minify: true,
		extract: true,
		width: 320,
		height: 565,
		penthouse: {
			blockJSRequests: false,
		},
	}),
];

const addCustomize = () => config => {
	if (process.env.NODE_ENV === "production") {
		config.devtool = false;
		config.plugins.push(...customizePlugin);
		config.devServer = {
			historyApiFallback: true,
		};
		config.output = {
			...config.output,
			filename: "[name].[chunkhash].js",
			chunkFilename: "[name].[chunkhash].js",
		};
		config = {
			...config,
			optimization: {
				usedExports: true,
				splitChunks: {
					chunks: "all",
					maxInitialRequests: Infinity,
					minSize: 0,
					cacheGroups: {
						reactVendor: {
							test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
							name: "react-vendor",
						},
						style: {
							test: /[\\/]node_modules[\\/](@material-ui)[\\/]/,
							name: "style",
						},
						editor: {
							test: /[\\/]node_modules[\\/](draft-js)[\\/]/,
							name: "editor",
						},
						xlsx: {
							test: /[\\/]node_modules[\\/](xlsx)[\\/]/,
							name: "xlsx",
						},
						components: {
							test: /[\\/]src[\\/](components)[\\/]/,
							name: "components",
						},
						utilityVendor: {
							test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
							name: "utilityVendor",
						},
						vendor: {
							test: /[\\/]node_modules[\\/](!react-bootstrap)(!lodash)(!moment)(!moment-timezone)(!draft-js)(!@material-ui)(!xlsx)(!components)[\\/]/,
							name: "vendor",
						},
					},
				},
				minimize: true,
				minimizer: [
					new UglifyJsPlugin({
						cache: true,
						parallel: true,
					}),
					new TerserPlugin({
						parallel: true,
					}),
				],
			},
		};
	} else if (process.env.NODE_ENV === "development") {
		config.devServer = {
			...config,
			port: 8080,
			historyApiFallback: true,
		};
	}

	return config;
};

const devServerConfig = () => config => ({
	...config,
	port: 8080,
	historyApiFallback: true,
});

module.exports = {
	webpack: override(
		addCustomize(),
		useBabelRc(),
		addWebpackAlias({
			"@": path.resolve(__dirname, "src/"),
			"@components": path.resolve(__dirname, "src/components/"),
			"@page": path.resolve(__dirname, "src/page/"),
			"@routes": path.resolve(__dirname, "src/routes/"),
			"@assets": path.resolve(__dirname, "src/assets/"),
			"@services": path.resolve(__dirname, "src/services"),
			"@config": path.resolve(__dirname, "src/config"),
			"@helpers": path.resolve(__dirname, "src/helpers"),
		}),
		addBabelPreset([
			"@babel/preset-react",
			{
				development: process.env.BABEL_ENV === "development",
			},
		])
	),
	jest: config => config,
	devServer: overrideDevServer(devServerConfig()),
	paths: (paths, env) => paths,
};
