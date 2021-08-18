'use strict';
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  // watch:true,
  // watchOptions:{
  //   ignored:/node_modules/,
  //   aggregateTimeout:300,
  //   poll:3000
  // },
  entry:'./src/index.js',
  output:{
    path:path.join(__dirname,'dist'),
    filename:'[name]_[chunkhash:8].js'
  },
  mode:'development',
  module:{
    rules:[
      {
        test:/.js$/,
        use:'babel-loader'
      },
      // {
      //   test:/.css$/,
      //   use:[MiniCssExtractPlugin.loader,'css-loader']
      // },
      {
        test:/.css$/,
        use:[MiniCssExtractPlugin.loader,'css-loader','postcss-loader',
      {
        loader:'px2rem-loader',
        options:{
          remUnit: 75,
          remPrecision: 8
        }
      }]
    },
      {
        test:/.less$/,
        use:[MiniCssExtractPlugin.loader,'css-loader',{
          loader:'px2rem-loader',
          options:{
            remUnit: 75,
            remPrecision: 8
          }
        },'less-loader','postcss-loader',
      ]
      },
      {
        test:/.(png|jpg)$/,
        use:[{
          loader:'file-loader',
          options:{
            name:'[name]_[hash:8].[ext]'
          }
        }]
      },
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp:/\.css$/g,
      cssProcessor:require('cssnano')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['main'],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
      }
    }),
    new CleanWebpackPlugin()
  ],
  devtool:'eval-source-map'
}