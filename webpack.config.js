const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'hidden-source-map' : 'cheap-module-source-map',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/images', to: './images' },
        { from: './public/data', to: './data' },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    inline: true,
    port: 3000,
    hot: true,
    publicPath: '',
  },
};