import { resolve } from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  entry: "./server/index.js",
  devServer: {
    host: "127.0.0.1",
    port: 8084,
    static: [
      {
        directory: resolve("./node_modules/js-cookie/dist"),
        publicPath: "/js-cookie",
        serveIndex: false,
        watch: false,
      },
      {
        directory: resolve("./server"),
        publicPath: "/",
        serveIndex: true,
        watch: true,
      },
    ],
  },
  output: {
    path: resolve("./build"),
    filename: "mastodon-share-button.js",
    library: "MastodonShareButtons",
    libraryTarget: "umd",
  },
  target: "browserslist",
  externals: {
    "js-cookie": {
      root: "Cookies",
      commonjs: "Cookies",
      commonjs2: "Cookies",
      amd: "Cookies",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "mastodon-share-button.css",
    }),
  ],
};
