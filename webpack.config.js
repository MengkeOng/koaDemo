var webpack = require('webpack');
var path = require('path');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    contentBase: './',
    port: 9600
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://0.0.0.0:9600',
    path.resolve(__dirname, 'app/main.jsx')
  ],
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: './js/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders:[
      { test: /\.css$/, include: path.resolve(__dirname, 'app'), loader: 'style-loader!css-loader' },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader',query: {presets: ['react', 'es2015']}}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
