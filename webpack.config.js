const path = require("path")

const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const SubresourceIntegrityWebpackPlugin = require("webpack-subresource-integrity")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")

const config = {
  entry: {
    app: path.resolve(__dirname, "src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[hash].js"
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.WatchIgnorePlugin([path.join(__dirname, ".env")]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/*.php"),
        to: path.resolve(__dirname, "build"),
        flatten: true
      },
      {
        from: path.resolve(__dirname, "src/signups.csv"),
        to: path.resolve(__dirname, "build"),
        flatten: true
      }
    ]),
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HTMLWebpackPlugin({
      title: "Sign-up Form",
      template: path.join(__dirname, "src/index.pug"),
      inject: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require("clean-css"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new SubresourceIntegrityWebpackPlugin({
      hashFuncNames: ["sha256", "sha384"],
      enabled: true
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, "src/assets/logo.jpg"),
      prefix: "icons-[hash]/",
      statsFilename: "iconstats-[hash].json",
      inject: true,
      title: "Signup Form"
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          { loader: "style-loader" },
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")({}), require("postcss-normalize")({})]
            }
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
