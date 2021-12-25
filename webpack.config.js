const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // Inputs
  entry: {
    index: "./src/client/index.js",
  },
  resolve: {
    extensions: [".js", ".scss"],
    alias: {
      "@shared": path.resolve(__dirname, "./src/shared"),
      "jinaga": "jinaga/dist/jinaga",
    },
  },

  // Processing
  mode: "production",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./views/index.html",
      publicPath: "/scripts/",
      filename: "../server/[name].html",
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'service-worker.js',
      inlineWorkboxRuntime: true
    }),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, "./src/client"),
        path.resolve(__dirname, "./src/shared")
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      ],
      exclude: [/node_modules/]
    },
    {
      test: /\.js$/,
      enforce: "pre",
      use: ["source-map-loader"],
      include: [/node_modules/]
    },
    {
      test: /\.(scss|css)$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  },

  // Outputs
  output: {
    filename: "[name]-[contenthash].js",
    path: path.resolve(__dirname, "dist", "scripts"),
  },
  devtool: "source-map",
};