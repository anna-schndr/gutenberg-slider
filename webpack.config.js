/**
 * External dependencies
 */

// Load webpack for use of certain webpack tools and methods
const webpack = require( 'webpack' );
// For extracting CSS (and SASS) into separate files
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
// For compressing JS files
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )

// Set different CSS extraction for editor only and common block styles
const blocksCSSPlugin = new ExtractTextPlugin( {
  filename: './css/style.css'
} );
const editBlocksCSSPlugin = new ExtractTextPlugin( {
  filename: './css/editor.css'
} );

// Configuration for the ExtractTextPlugin.
// Handles CSS
const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [ require( 'autoprefixer' ) ]
      }
    },
    {
      loader: 'sass-loader',
      query: {
        outputStyle:
          // Compresses CSS when in production
          'production' === process.env.NODE_ENV ? 'compressed' : 'nested'
      }
    }
  ]
};

// Define JavaScript entry points
const entryPointNames = [ 'blocks', 'frontend' ];

// Setup externals
const externals = {};
// Setup external for each entry point
entryPointNames.forEach( entryPointName => {
  externals[ '@/lg6' + entryPointName ] = {
    this: [ 'lg6', entryPointName ]
  }
} );

// Define WordPress dependencies
const wpDependencies = [ 'components', 'element', 'blocks', 'utils', 'date' ];
// Setup externals for all WordPress dependencies
wpDependencies.forEach( wpDependency => {
  externals[ '@wordpress/' + wpDependency ] = {
    this: [ 'wp', wpDependency ]
  };
});

// Start of main webpack config
const config = {
  // Set mode
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  // Go through each entry point and prepare for use with externals
  entry: './index.js',
  // Include externals
  externals,
  // Set output
  output: {
    // Place all bundles JS in current directory
    filename: 'block.build.js',
    path: __dirname,
    library: [ 'pluginnamespace', '[name]' ],
    libraryTarget: 'this'
  },
  // Fall back to node_modules for file resolution
  resolve: {
    modules: [ __dirname, 'node_modules' ]
  },
  module: {
    rules: [
      {
        // Run JavaScript files through Babel
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        // Setup SASS (and CSS) to be extracted
        test: /style\.s?css$/,
        use: blocksCSSPlugin.extract( extractConfig )
      },
      {
        // Setup SASS (and CSS) to be extracted
        test: /editor\.s?css$/,
        use: editBlocksCSSPlugin.extract( extractConfig )
      }
    ]
  },
  plugins: [
    // Setup environment conditions
    new webpack.DefinePlugin( {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    } ),
    // Pull in CSS plugins settings
    blocksCSSPlugin,
	  editBlocksCSSPlugin,
    // For migrations from webpack 1 to webpack 2+
    new webpack.LoaderOptionsPlugin( {
      minimize: process.env.NODE_ENV === 'production',
      debug: process.env.NODE_ENV !== 'production'
    } )
  ],
  // Do not include information about children in stats
  stats: {
    children: false
  }
};

switch ( process.env.NODE_ENV ) {
  default:
    // Apply source mapping when not in production
    config.devtool = process.env.SOURCEMAP || 'source-map';
}

module.exports = config;