const myPath = require('./config/myPath');
const path = require('path');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  entry: {
    app: 'js/app',
  },
  output: {
    path: myPath.root.dest,
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
    ],
  },
  stats: {
    children: false,
  },
  resolve: {
    root: [
      path.resolve(__dirname, 'dev'),
      '../node_modules',
    ],
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.CommonsChunkPlugin('chunk.js', ['app']),
  ],
};

// build / env = production
if (isDevelopment) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  );
}

module.exports = config;
