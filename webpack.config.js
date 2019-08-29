"use strict"

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

var _node_env

switch (process.env.NODE_ENV) {
  case "development":
  case null:
  case undefined:
    _node_env = "development"
    break
  case "production":
    _node_env = "production"
    break
  default:
    throw new Error("Не удалось определить окружение.")
    break
}

const NODE_ENV = _node_env

const webpack = require("webpack")

module.exports = {
  mode: NODE_ENV,
  context: __dirname + "/test",
  entry: "./assets/js/js",
  output: {
    path: __dirname + "/test/public/js",
    filename: "js.js"
  },
  watch: NODE_ENV == "development",
  watchOptions: {
    aggregateTimeout: 300
  },
  devtool: NODE_ENV == "development" ? "cheap-inline-module-source-map" : false,
  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV", "USER"]),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG: '"ru"'
    })
  ],
  optimization: {
    minimize: NODE_ENV == "development" ? false : true
  },
  module: {
    rules: [
      // ES6 в ES5 (babel)
      // npm install -D babel-loader @babel/core @babel/preset-env webpack
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          // npm i @babel/plugin-transform-runtime
          options: {
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      },
      // yarn add sass sass-loader postcss-loader css-loader --dev
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            // This loader resolves url() and @imports inside CSS
            loader: "css-loader"
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: "postcss-loader"
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },
      // yarn add autoprefixer cssnano --dev
      // yarn add file-loader --dev
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              // outputPath: function(url, resourcePath, context) {
              //   console.log('url, resourcePath, context: ', url, resourcePath, context)
              //   return "../images"
              // },
              // publicPath: function(url, resourcePath, context) {
              //   console.log('url, resourcePath, context: ', url, resourcePath, context)
              //   // return url.replace('../', '/assets/')
              // },
              outputPath: "../images",
              name: "[path][name]_[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "../fonts",
              name: "[path][name]_[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // yarn add mini-css-extract-plugin --dev
    new MiniCssExtractPlugin({
      filename: "../css/css.css"
    })
  ]
}
