const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

//Webpack Plugins

const DefinePlugin = require('webpack/lib/DefinePlugin');

//Webpack Constants
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = webpackMerge(commonConfig.metadata, {
  host: 'localhost',
  port: 3000,
  ENV: ENV
});

//Webpack configuration
module.exports = webpackMerge(commonConfig, {
  //Merged metadata from webpack.common.js for index.html
  metadata: METADATA,
  //Switch loaders to debug mode.
  debug: true,
  //Developer tool to enhance debugging
  devtool: 'cheap-module-source-map',
  //Options affecting the output of the compilation
  output: {
    //The output directory as absolute path (required).
    path: helpers.root('dist'),
    //Specifies the name of each output file on disk.
    filename: '[name].bundle.js',
    //The filename of the SourceMaps for the JavaScript files. They are inside the output.path directory.
    sourceMapFilename: '[name].map',
    //The filename of non-entry chunks as relative path inside the output.path directory.
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    //Define variables.
    new DefinePlugin({
      'ENV': JSON.stringify(METADATA.ENV),
      'process.env': {
        'ENV': JSON.stringify(METADATA.ENV),
        'NODE_ENV': JSON.stringify(METADATA.ENV)
      }
    })
  ],
  //An extensible linter for the TypeScript language
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  //The webpack-dev-server is a little node.js Express server
  devServer: {
    port: METADATA.port,
    host: METADATA.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: helpers.root('dist')
  },
  //Node configuration
  node: {
    global: 'window',
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});