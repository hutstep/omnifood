const webpack = require('webpack'),
  path = require('path'),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './main.js',
    './index.html',
    './styles.js'
  ],
  output: {
    path: path.join(__dirname, 'docs', 'assets'),
    filename: '[name].bundle.js',
    publicPath: '/assets/'
  },
  plugins: [],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css'),
      include: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src', 'vendors')
      ]
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css!postcss'),
      include: path.resolve(__dirname, 'src', 'resources')
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.html$/,
      loader: 'file?name=../[name].[ext]!extract!html?attrs=false'
    }, {
      test: /\.(jpg|png|eot|woff2?|ttf|svg)(\?v=\d+\.\d+\.\d+)?(#\w+)?$/,
      loader: 'file'
    }]
  },
  postcss: [
    require('autoprefixer')
  ],
  plugins: [
    new ExtractTextPlugin("styles.css")
  ],
  devServer: {
    inline: true,
    contentBase: './src'
  },
  devtool: 'cheap-module-eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  );
  config.devtool = 'cheap-module-source-map';
  config.output.publicPath = 'https://hutstep.github.io/omnifood/assets/';
}

module.exports = config;