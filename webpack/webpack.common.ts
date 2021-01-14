import webpack from "webpack";
import paths from './getPath'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')
const getPath = paths.getPath
const project = require(getPath('package.json'))
// 环境变量参数
let envConfig
try {
  envConfig = require(getPath(`env/${process.env.NODE_ENV}`))
} catch (e) {
  envConfig = {}
}
console.log(envConfig)
// antd 主题
let antdModifyVars
try {
  antdModifyVars = require(getPath('src/style/antd'))
} catch (e) {
  antdModifyVars = {}
}

const isBuild = process.env.NODE_ENV === 'production'

const config: webpack.Configuration = {
  entry: {
    app: getPath('src/index.tsx')
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: paths.DIST,
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    "regenerator": true
                  }
                ],
                "@babel/plugin-syntax-dynamic-import",
                ['import', {
                  'libraryName': 'antd',
                  'style': true
                }, 'antd']
              ]
            },
          }
        ]
      },
      {
        test: /\.m\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]___[hash:base64:5]'
              },
              importLoaders: 1,
              sourceMap: !isBuild
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /(?<!\.m)\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
              sourceMap: !isBuild
            }
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: antdModifyVars,
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
              sourceMap: !isBuild
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'images/',
              esModule: false
            }
          }
        ],
        exclude: paths.MATCH_NODE_MODULES,
        include: paths.PATH_SRC
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'fonts/',
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(mov|mp4|webm)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'videos/',
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(pdf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'pdf/',
              esModule: false
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      minChunks: 2,
      maxAsyncRequests: 5,
      // maxInitialRequests: 3
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.APP_CONFIG": JSON.stringify(envConfig),
      "APP": JSON.stringify(envConfig)
    }),
    new HtmlWebpackPlugin({
      title: project.name,
      template: getPath('src/index.html'),
      favicon: getPath('src/assets/images/favicon.ico')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: `${'[name].[chunkhash].css'}`,
      chunkFilename: `[name].[chunkhash].css`,
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new CopyPlugin({
      patterns: [
        { from: getPath('static'), to: 'static', noErrorOnMissing: true }
      ]
    }),
    new ProgressBarPlugin({
      format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:msg)',
      clear: false,
      stream: process.stdout
    }),
  ]
};
export default config