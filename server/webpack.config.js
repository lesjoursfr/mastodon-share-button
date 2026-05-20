import MiniCssExtractPlugin from "mini-css-extract-plugin";
import MinimizerPlugin from "minimizer-webpack-plugin";
import { resolve } from "path";
import * as sass from "sass";

export default {
  mode: "development",
  entry: resolve("./server/index.ts"),
  devServer: {
    host: "127.0.0.1",
    port: 8084,
    static: [
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
    library: {
      name: "MastodonShareButtons",
      type: "umd",
      export: "default",
    },
  },
  target: "browserslist",
  externals: {},
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"],
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: sass,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "mastodon-share-button.css",
    }),
  ],
  optimization: {
    minimizer: [
      new MinimizerPlugin({
        test: /\.(?:[cm]?js|css)(\?.*)?$/i,
        extractComments: false,
        minify: [MinimizerPlugin.terserMinify, MinimizerPlugin.cssnanoMinify],
        minimizerOptions: [
          // Options for `MinimizerPlugin.terserMinify`
          {
            ecma: 6,
            compress: true,
            format: {
              comments: false,
            },
          },
          // Options for `MinimizerPlugin.cssnanoMinify`
          {
            preset: ["cssnano-preset-default", { discardComments: { removeAll: true } }],
          },
        ],
      }),
    ],
  },
};
