var webpack = require( 'webpack' ),
	NODE_ENV = process.env.NODE_ENV || 'development',
	webpackConfig = {
		entry: './index.js',
		output: {
			path: __dirname,
			filename: 'block.build.js',
		},
		module: {
			loaders: [
				{
					test: /.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
				},
				{
	                test: /\.scss$/,
	                loader: 'sass-loader',
	            },
			],
		},
		plugins: [
			new webpack.DefinePlugin( {
				'process.env.NODE_ENV': JSON.stringify( NODE_ENV )
			} ),
		]
	};

if ( 'production' === NODE_ENV ) {
	webpackConfig.plugins.push( new webpack.optimize.UglifyJsPlugin({ sourceMap: true }) );
}

module.exports = webpackConfig;
