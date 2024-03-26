var path = require("path");
var PROD = (process.env.NODE_ENV !== undefined && process.env.NODE_ENV.trim() === "production");
var LEGACY = (process.env.LEGACY);
var hostname = "localhost";
var port = 8080;
var enter = LEGACY ? {
	"epub.legacy": ["@babel/polyfill", "./src/epub.js"]
} : {
	"epub": "./src/epub.js",
};

module.exports = {
	entry: enter,
	mode: PROD ? "production" : "development",
	devtool: PROD ? false : "source-map",
	output: {
		path: path.resolve("./dist"),
		// path: "./dist",
		filename: PROD ? "[name].min.js" : "[name].js",
		sourceMapFilename: "[name].js.map",
		library: "ePub",
		libraryTarget: "umd",
		publicPath: "/dist/"
	},
	externals: {
		"jszip": "jszip",
		"xmldom": "xmldom"
	},
	devServer: {
		host: hostname,
		port: port,
		inline: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules\/(?!(marks-pane)\/).*/,
				loader: "babel-loader",
				options: {
					presets: [["@babel/preset-env", { targets: "defaults"}]]
				}
			}
		]
	}
};
