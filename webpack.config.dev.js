const { VueLoaderPlugin } = require("vue-loader");
const CopyPlugin = require("copy-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devServer: {
    hot: true,
    watchOptions: {
      poll: true,
    },
    writeToDisk: true
  },
  devtool: "source-map",
  mode: "development",
  entry: [__dirname + "/src/main.js"],
  output: {
    path: __dirname + "/dev",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              appendExtension: true,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "./src/index.html", to: "index.html" },
        { from: "./src/assets/**", to: "./assets/[name].[ext]" },
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
};