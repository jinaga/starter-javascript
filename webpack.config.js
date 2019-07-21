const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function client() {
  const views = fs.readdirSync(path.resolve(__dirname, 'views'))
    .filter((file) => path.extname(file) === '.html')
    .map((file) => path.basename(file, '.html'));
  const scripts = fs.readdirSync(path.resolve(__dirname, 'src/client'))
    .filter((file) => path.extname(file) === '.js')
    .map((file) => path.basename(file, '.js'));
  const names = views.filter((name) => scripts.includes(name));

  return {
    mode: 'production',
    entry: names.reduce((e, name) =>
      ({...e, [name]: `./src/client/${name}.js`}),
      {}
    ),
    output: {
      filename: 'scripts/[name]-[hash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    target: 'web',
    devtool: 'source-map',
    plugins: names.map((name) => new HtmlWebpackPlugin({
      chunks: [name],
      template: `views/${name}.html`,
      filename: `views/${name}.html`,
    })),
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'src/client'),
            path.resolve(__dirname, 'src/shared'),
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          ],
          exclude: /node-modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@shared': path.resolve(__dirname, 'src/shared'),
        'jinaga': 'jinaga/dist/jinaga',
      },
    },
  };
}

module.exports = [
  client(),
  {
    mode: 'production',
    entry: './src/server/server.js',
    output: {
      filename: 'server.js',
      path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'src/server'),
            path.resolve(__dirname, 'src/shared'),
          ],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          ],
          exclude: /node-modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@shared': path.resolve(__dirname, 'src/shared'),
      },
    },
    externals: [nodeExternals()],
  },
];
