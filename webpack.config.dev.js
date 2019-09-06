"use strict"

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack")
const path = require('path');

module.exports = {
  mode: "development",
  context: __dirname + "/test",
  entry: "./assets/js/js_dev",
  output: {
    path: __dirname + "/test/public/js",
    filename: "js.js"
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300
  },
  devtool: "cheap-inline-module-source-map",
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {loader: MiniCssExtractPlugin.loader},
          {loader: "css-loader"},
          {loader: "postcss-loader"},
          {loader: "sass-loader", options: {implementation: require("sass")}}
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
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
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      // LANG: '"ru"',
      DEV: true,
    }),
    new MiniCssExtractPlugin({
      filename: "../css/css.css"
    })
  ]
}
