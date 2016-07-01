const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
//const HtmlElementsPlugin = require('./html-elements-plugin');

/* Webpack Constants */
const METADATA = {
  title: 'A webpack starter for Angular 2 with TypeScript',
  baseUrl: '/',
  isDevServer: helpers.isDevServer()
};

/* Webpack configuration */
/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  // Static metadata for index.html
  metadata: METADATA,
 // Entry
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor':    './src/vendor',
    'main':      './src/boot'

  },
  //Options affecting the resolving of modules.
  resolve: {
    //An array of extensions that should be used to resolve modules
    extensions: ['', '.ts', '.js', '.json'],

    // Make sure root is src
    root: helpers.root('src'),

    // remove other default values
    modulesDirectories: ['node_modules']
  },
  //Options affecting the normal modules.
  module: {

    // An array of applied pre and post loaders.
    preLoaders: [
      //Source map loader support for *.js files. Extracts SourceMaps for source files that as added as sourceMappingURL comment.
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular'),
          helpers.root('node_modules/@ngrx'),
          helpers.root('node_modules/@angular2-material')
        ]
      }
    ],
    //An array of automatically applied loaders.
    loaders: [
      //Typescript loader support for .ts and Angular 2 async routes via .async.ts
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      //Json loader support for *.json files
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      //to string and css loader support for *.css files
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      //Raw loader support for *.html
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html')]
      }
    ]
  },
//Add additional plugins to the compiler
  plugins: [
    //Do type checking in a separate process, so webpack don't need to wait
    new ForkCheckerPlugin(),
    //Varies the distribution of the ids to get the smallest id length for often used ids
    new webpack.optimize.OccurenceOrderPlugin(true),
    //Shares common code between the pages.
    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor'].reverse()
    }),
    //Copy files and directories in webpack.
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    //Simplifies creation of HTML files to serve your webpack bundles
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),
    //Generate html tags based on javascript maps.
    //new HtmlElementsPlugin({
    //  headTags: require('./head-config.common')
    //})
  ],
  //Node configuration
  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};