const path = require("path");
const NodemonPlugin = require("nodemon-webpack-plugin");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const NodeExternals = require("webpack-node-externals");
const SizePlugin = require("size-plugin");

module.exports = {
  entry: ["@babel/polyfill", path.resolve(__dirname, "src/index.js")],
  output: {
    path: path.resolve(__dirname, "build"),
    libraryTarget: "commonjs",
    filename: "main.js",
    sourceMapFilename: "main.js.map"
  },
  target: "node",
  externals: [NodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: true
            }
          },
          {
            loader: "shebang-loader"
          },
          {
            loader: "source-map-loader"
          }
        ]
      }
    ]
  },
  devtool: "source-map",
  resolve: {
    symlinks: false
  },
  plugins: [
    new NodemonPlugin({
      verbose: false
    }),
    new DuplicatePackageCheckerPlugin(),
    new SizePlugin()
  ]
};
