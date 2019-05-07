const path = require("path")

const webpack = require("webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")

const config = {
  entry: {
    app: path.resolve(__dirname, "src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "[name].[hash].js"
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.WatchIgnorePlugin([path.join(__dirname, ".env")]),
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "src/index.pug"),
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          { loader: "style-loader" },
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: { plugins: [require("autoprefixer")({})] }
          },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/[hash].[ext]"
            }
          },
          {
            loader: "img-loader",
            options: {
              plugins: [
                require("imagemin-mozjpeg")({ progressive: true, arithmetic: false }),
                require("imagemin-pngquant")({ floyd: 0.5, speed: 2 }),
                require("imagemin-svgo")({
                  plugins: [{ removeTitle: true }, { convertPathData: false }]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/fonts/[name].[ext]"
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
