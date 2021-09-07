const glob = require('glob');
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CopyWebpackPlugin = require('./plugins/CopyWebpackPlugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const smp = new SpeedMeasureWebpackPlugin();
const webpack = require('webpack');
const PATHS = {
  src: path.join(__dirname, 'src')
};
module.exports = {
  // watch:true,
  // watchOptions:{
  //   ignored:/node_modules/,
  //   aggregateTimeout:300,
  //   poll:3000
  // },
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.js$/,
        include: path.resolve('src'),
        exclude: path.resolve(__dirname, './node_modules'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2
            }
          },
          'babel-loader?cacheDirectory=true'
          // 'eslint-loader'
        ]
      },
      {
        test: /.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',
        {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75,
            remPrecision: 8
          }
        }]
      },
      {
        test: /.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75,
            remPrecision: 8
          }
        }, 'postcss-loader', 'less-loader'
        ]
      },
      {
        test: /.(png|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name]_[hash:8].[ext]'
          }
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 85
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75
            }
          }
        }
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['main', 'vendors'],
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
    new CleanWebpackPlugin(),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    })
    // new HardSourceWebpackPlugin(),

    // new webpack.DllReferencePlugin({
    //   manifest: require('./build/library/library.json')
    // }),
    // new HtmlWebpackExternalsPlugin({
    //   externals:[
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
    //       global: 'React',
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
    //       global: 'ReactDOM',
    //     },
    //   ]
    // }),
    // new FriendlyErrorsWebpackPlugin(),
    // new BundleAnalyzerPlugin()
    // new CopyWebpackPlugin({
    //   dirFiles: path.resolve(__dirname, 'dist'),
    //   dirFilesTo: 'E:/FrontendDevelopment/17webpack/save',
    //   dir: path.resolve(__dirname, 'dist'),
    //   dirTo: 'E:/FrontendDevelopment/17webpack/save',
    // }),
  ],
  //   optimization: {
  //     splitChunks: {
  //         cacheGroups: {
  //             commons: {
  //                 test:/(react|react-dom)/,
  //                 name: 'vendors',
  //                 chunks: 'all',
  //             }
  //         }
  //     }
  // },
  optimization: {
    // splitChunks: {
    //   minSize: 0,
    //   cacheGroups: {
    //     commons: {
    //       name: 'commons',
    //       chunks: 'all',
    //       minChunks: 2
    //     }
    //   }
    // },
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js'),
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.js'],
      mainFields: ['main']
    }
  }
  // cache: {
  //   type: 'filesystem',
  // },
  // devtool: 'eval-source-map',
  // stats: 'errors-only'
}