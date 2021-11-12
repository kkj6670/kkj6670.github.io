/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const { NODE_ENV } = process.env;
const prod = NODE_ENV === 'production';
const URL_PATH = '/react-blog/'; // github pages url

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? 'hidden-source-map' : 'inline-source-map',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: URL_PATH,
  },

  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts)x?$/,
        use: ['ts-loader'],
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
      URL_PATH: JSON.stringify(URL_PATH),
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
  ],

  devServer: {
    contentBase: path.resolve('dist'),
    historyApiFallback: {
      index: `${URL_PATH}/index.html`,
    },
    inline: true,
    port: 3000,
    hot: true,
    publicPath: URL_PATH,
  },
};
