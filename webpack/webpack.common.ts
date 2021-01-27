import webpack from "webpack";
import paths from './getPath'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
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
// antd 主题
let antdModifyVars
try {
  antdModifyVars = require(getPath('src/style/antd/antd'))
} catch (e) {
  antdModifyVars = {}
}

// AntDesignThemePlugin 导出color.less的主题变量
let themeVariables: Array<string>
try {
  themeVariables = Object.keys(require(getPath('src/style/antd/themeVars'))).map(key => key)
} catch (e) {
  themeVariables = []
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
        exclude: paths.MATCH_NODE_MODULES,
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
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
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
      },
      {
        test: /\.(md)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'md/',
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
    minimize: isBuild,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            // We want terser to parse ecma 8 code. However, we don't want it
            // to apply any minification steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending further investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
            pure_funcs: ["console.log"]
          },
          mangle: {
            safari10: true,
          },
          // Added for profiling in devtools
          keep_classnames: isBuild,
          keep_fnames: isBuild,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: !isBuild
            ? {
              // `inline: false` forces the sourcemap to be output into a
              // separate file
              inline: false,
              // `annotation: true` appends the sourceMappingURL to the end of
              // the css file, helping the browser find the sourcemap
              annotation: true,
            }
            : false,
        },
        cssProcessorPluginOptions: {
          preset: ['default', { minifyFontValues: { removeQuotes: false } }],
        },
      })
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: false,
    },
    // Keep the runtime chunk separated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    // https://github.com/facebook/create-react-app/issues/5358
    runtimeChunk: {
      name: (entrypoint: any) => `runtime-${entrypoint.name}`,
    },

  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.APP_CONFIG": JSON.stringify(envConfig)
    }),
    new HtmlWebpackPlugin({
      title: project.name,
      template: getPath('src/index.html'),
      favicon: getPath('src/assets/images/favicon.ico')
    }),
    // new AntDesignThemePlugin({
    //   indexFileName: false,
    //   antDir: getPath('node_modules/antd'),
    //   stylesDir: getPath('src/style/antd/less'),
    //   varFile: getPath('src/style/antd/less/_var.less'),
    //   mainLessFile: getPath('src/style/antd/less/global.less'),
    //   lessUrl: '/static/less.min.js',
    //   themeVariables
    // }),
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